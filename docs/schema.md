# Database Schema – Squeegee Samurai

Portable PostgreSQL. Apply `api/schema.sql` in Supabase SQL editor or any Postgres client.

---

## Table: `quotes`

Stores each quote submission for leads, PDF tracking, email delivery, and owner follow-up.

### Core Columns

| Column             | Type        | Default              | Notes                                    |
|--------------------|-------------|----------------------|------------------------------------------|
| `id`               | UUID (PK)   | `gen_random_uuid()`  | Auto-generated                           |
| `created_at`       | TIMESTAMPTZ | `now()`              | Submission timestamp                     |
| `first_name`       | TEXT        | NOT NULL             | Contact first name (or 'Commercial')     |
| `last_name`        | TEXT        | NOT NULL             | Contact last name (or 'Lead')            |
| `email`            | TEXT        | NOT NULL             | Contact email                            |
| `phone`            | TEXT        | nullable             | Contact phone                            |
| `address`          | TEXT        | nullable             | Contact address                          |
| `city`             | TEXT        | nullable             | Contact city                             |
| `zip_code`         | TEXT        | nullable             | Contact zip code                         |
| `property_type`    | TEXT        | nullable             | e.g. 'townhouse', 'office'              |
| `service_type`     | TEXT        | nullable             | e.g. 'interior', 'exterior', 'Interior+Exterior' |
| `segment`          | TEXT        | nullable             | `'residential'` or `'commercial'`        |
| `form_input`       | JSONB       | `'{}'`               | Raw form data (flexible, no migrations needed) |
| `quote_breakdown`  | JSONB       | `'{}'`               | `{ subtotal, discount, total }` etc.     |
| `quote_total_cents`| INT         | NOT NULL             | Server-computed total in cents           |
| `currency`         | TEXT        | `'USD'`              | Currency code                            |
| `image_urls`       | TEXT[]      | nullable             | Optional uploaded image URLs             |
| `status`           | TEXT        | `'new'`              | `'new'` → `'contacted'` → `'scheduled'` → `'closed'` |

### PDF & Email Tracking Columns

| Column                        | Type        | Default      | Notes                                       |
|-------------------------------|-------------|--------------|---------------------------------------------|
| `pdf_path`                    | TEXT        | nullable     | Supabase Storage path (`{year}/{id}.pdf`)    |
| `pdf_generated_at`            | TIMESTAMPTZ | nullable     | When PDF was generated                       |
| `pdf_url_expires_at`          | TIMESTAMPTZ | nullable     | When signed URL expires                      |
| `pdf_object_created_at`       | TIMESTAMPTZ | nullable     | When storage object was created              |
| `signed_url_last_generated_at`| TIMESTAMPTZ | nullable     | Last time a signed URL was generated         |
| `pdf_status`                  | TEXT        | `'pending'`  | `'pending'` → `'generated'` or `'failed'`   |
| `email_sent_at`               | TIMESTAMPTZ | nullable     | When customer email was sent                 |
| `email_status`                | TEXT        | `'pending'`  | `'pending'` → `'sent'` or `'failed'`        |
| `email_error`                 | TEXT        | nullable     | Error message if email/PDF delivery failed   |

### Indexes

| Index                    | Columns         | Notes                          |
|--------------------------|-----------------|--------------------------------|
| `idx_quotes_created_at`  | `created_at DESC` | Listing by date               |
| `idx_quotes_status`      | `status`          | Filtering by workflow status  |
| `idx_quotes_email`       | `email`           | Lookup by email               |
| `idx_quotes_pdf_path`    | `pdf_path`        | Partial: WHERE pdf_path IS NOT NULL |
| `idx_quotes_pdf_status`  | `pdf_status`      | Filtering by PDF generation status |

### Full SQL

See [`api/schema.sql`](../api/schema.sql) for the complete CREATE TABLE and ALTER TABLE statements.

---

## Notes
- No user/account tables for MVP.
- All access server-side only; no direct client DB access.
- `first_name`/`last_name` default to `'Commercial'`/`'Lead'` for commercial submissions without names.
- `form_input` JSONB stores the raw form data as-is, allowing new fields without schema migrations.
- Signed URLs expire (default 72h); the `pdf_path` column stores the permanent storage path for re-generating URLs.
