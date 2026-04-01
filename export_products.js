const https = require('https');
const fs = require('fs');

const SUPABASE_URL = 'https://flajxvqhvriblchlubnf.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsYWp4dnFodnJpYmxjaGx1Ym5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDUxNTEsImV4cCI6MjA4MTQ4MTE1MX0.88kGzNJSu5EtwRvK03LCWFqsUI_K-1jZEXcSMvKftns';

function fetchPage(offset, limit) {
  return new Promise((resolve, reject) => {
    const path = `/rest/v1/products?select=sku,name,technical_name,category,sub_category,product_type,unit,base_rate,gst_percent,hsn_code,packaging_type,weight_kg,packing_size,moq_web,moq_dist,moq_bulk_kg,sku_status_web,sku_status_dist,sku_status_bulk,p_alpha,c_beta,t_gama,notes&order=category,name&offset=${offset}&limit=${limit}`;
    const options = {
      hostname: 'flajxvqhvriblchlubnf.supabase.co',
      path,
      method: 'GET',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Range-Unit': 'items',
        'Range': `${offset}-${offset + limit - 1}`
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

function escape(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

async function main() {
  const headers = ['SKU','Name','Technical Name','Category','Sub Category','Product Type','Unit',
    'Base Rate','GST %','HSN Code','Packaging Type','Weight (kg)','Packing Size',
    'MOQ Web','MOQ Dist','MOQ Bulk (kg)','Status Web','Status Dist','Status Bulk',
    'P Alpha','C Beta','T Gama','Notes'];

  const rows = [headers.join(',')];
  let offset = 0;
  const limit = 200;
  let total = 0;

  while (true) {
    const batch = await fetchPage(offset, limit);
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const r of batch) {
      rows.push([
        r.sku, r.name, r.technical_name, r.category, r.sub_category, r.product_type, r.unit,
        r.base_rate, r.gst_percent, r.hsn_code, r.packaging_type, r.weight_kg, r.packing_size,
        r.moq_web, r.moq_dist, r.moq_bulk_kg, r.sku_status_web, r.sku_status_dist, r.sku_status_bulk,
        r.p_alpha, r.c_beta, r.t_gama, r.notes
      ].map(escape).join(','));
    }
    total += batch.length;
    console.log(`Fetched ${total} products...`);
    if (batch.length < limit) break;
    offset += limit;
  }

  fs.writeFileSync('products_master.csv', rows.join('\n'), 'utf8');
  console.log(`Done. Total: ${total} products written to products_master.csv`);
}

main().catch(console.error);
