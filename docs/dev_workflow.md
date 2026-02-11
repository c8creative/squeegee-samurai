# Development Workflow – Squeegee Samurai

## Environments
- **Local** – developer machine (frontend + Express API + Supabase cloud DB)
- **Preview** – Vercel preview deployments (frontend + serverless API + Supabase)
- **Production** – Vercel + Supabase (Postgres + Storage)

---

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```
- App: **http://localhost:5173**

### Backend API (Express – local dev)
```bash
cd api
npm install
cp .env.example .env   # configure all variables (see below)
npm run dev
```
- API: **http://localhost:3000** (or port in `.env`)

### Database
- **Supabase cloud** (recommended): use project connection string in `DATABASE_URL`
- **Supabase local**: `supabase start` (see Supabase CLI)
- **Docker Postgres**: run Postgres and set `DATABASE_URL`

### Full Stack (local)
1. Start API: `cd api && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173 and submit a quote (form posts to API)

### Useful Dev Endpoints
- `GET http://localhost:3000/api/health` — liveness check
- `GET http://localhost:3000/api/test-pdf` — render a sample PDF in-browser (dev only)

---

## Environment Variables

### API (`api/.env`)

See `api/.env.example` for the full template.

| Variable                   | Purpose                                        | Required |
|---------------------------|------------------------------------------------|----------|
| `PORT`                    | Express server port (default 3000)             | No       |
| `DATABASE_URL`            | Postgres connection string                     | Yes      |
| `FRONTEND_ORIGIN`         | Allowed CORS origin (e.g. `http://localhost:5173`) | Yes  |
| `SUPABASE_URL`            | Supabase project URL                           | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | Yes      |
| `SUPABASE_STORAGE_BUCKET` | Storage bucket name (default `quotes`)         | Yes      |
| `RESEND_API_KEY`          | Resend API key for transactional email         | Yes      |
| `RESEND_FROM_EMAIL`       | Sender address (e.g. `quotes@squeegee-samurai.com`) | Yes |
| `PDF_URL_EXPIRY_SECONDS`  | Signed URL expiry (default 259200 = 72h)       | No       |

### Vercel Environment Variables
Set the same variables above in Vercel project settings (Settings → Environment Variables) for preview and production deployments.

### Frontend
- No secrets. API base URL can be set via `VITE_API_URL` for preview/prod.

---

## Database Setup

1. Run `api/schema.sql` against your Postgres instance (Supabase SQL editor or `psql`)
2. This creates the `quotes` table with all columns including PDF/email metadata
3. See [schema.md](./schema.md) for column definitions

---

## Supabase Storage Setup

1. Create a private bucket named `quotes` in Supabase Dashboard → Storage
2. No public access needed — access is via `SUPABASE_SERVICE_ROLE_KEY`
3. See [supabase-storage-setup.md](./supabase-storage-setup.md) for detailed instructions

---

## Deployment

### Vercel (configured via `vercel.json`)
- **Frontend**: Built from `frontend/`, output to `dist`
- **API**: Serverless functions from `api-serverless/`
- **Routes**:
  - `/api-serverless/*` → serverless functions
  - `/*` → static frontend

### Infrastructure
- **Database**: Supabase Postgres
- **Storage**: Supabase Storage (private `quotes` bucket)
- **Email**: Resend API

### Deploy Checklist
1. Ensure all environment variables are set in Vercel
2. Ensure Supabase Storage bucket `quotes` exists (private)
3. Ensure database schema is applied (`api/schema.sql`)
4. Push to `main` branch → Vercel auto-deploys