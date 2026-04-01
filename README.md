# Girish Working Repo
**finance-360 | Supabase Project | Products & Pricing Data**
Last Updated: 2026-04-01

---

## Files in this Repo

| File | Description |
|---|---|
| `products_master.csv` | All 1,142 products from the products table — full data export |
| `A_Plus_Products.csv` | 155 A+ grade products with base prices |
| `DATA_AUDIT.md` | Completeness audit — what fields are missing and need to be filled |

---

## Products Table — Data Completeness Summary

| Field | Filled | Missing | % Done |
|---|---|---|---|
| base_rate (non-zero) | 417 | 725 | 36.5% |
| gst_percent | 843 | 299 | 73.8% |
| hsn_code | 833 | 309 | 72.9% |
| packaging_type | 0 | 1142 | 0% |
| weight_kg | 0 | 1142 | 0% |
| packing_size | 0 | 1142 | 0% |
| moq_web | 243 | 899 | 21.3% |
| moq_dist | 288 | 854 | 25.2% |
| moq_bulk_kg | 366 | 776 | 32.1% |
| technical_name | 633 | 509 | 55.4% |
| p_alpha / c_beta / t_gama | 605 | 537 | 53% |

---

## Channel Status

| Channel | Active | Not Listed/Inactive |
|---|---|---|
| Web | 809 | 333 |
| Bulk | 257 | 885 |

---

## To Make Products Module Live — Action Items

### P1 — Critical
1. Fill `base_rate` for 725 products
2. Fill `gst_percent` for 299 products
3. Fill `hsn_code` for 309 products
4. Fill `packaging_type` for ALL 1,142 products
5. Fill `weight_kg` for ALL 1,142 products
6. Fill `packing_size` for ALL 1,142 products

### P2 — Important
7. Fill `moq_web` for 899 products
8. Fill `moq_dist` for 854 products
9. Fill `moq_bulk_kg` for 776 products
10. Fill `p_alpha / c_beta / t_gama` for 537 products
11. Fill `technical_name` for 509 products

### P3 — Optional
12. Fill `base_rate_source` (0% filled)
13. Fill `base_sku_code` (0% filled)

---

## Bulk Products — 21 SKUs Pending (No Price, Inactive)
BK-983, BK-985, BK-973, BK-689, BK-974, BK-1006, BK-975, BK-1008, BK-979,
BK-604, BK-966, BK-608, BK-978, BK-1007, BK-977, BK-721, BK-722, BK-723,
BK-976, BK-758, BK-967
