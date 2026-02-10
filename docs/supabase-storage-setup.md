# Supabase Storage Setup for PDF Generation

## Overview

The PDF generation feature requires a private Supabase Storage bucket to store quote PDFs securely.

## Setup Steps

### 1. Create Storage Bucket

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure the bucket:
   - **Name**: `quotes`
   - **Public**: **OFF** (keep it private)
   - **File size limit**: Default (or set to 10MB if needed)
5. Click **"Create bucket"**

### 2. Verify Service Role Access

The service role key (used in your API) automatically bypasses Row Level Security (RLS) policies, so no additional SQL policies are needed for server-side-only access.

**Verification**:
- Service role key should be set in `SUPABASE_SERVICE_ROLE_KEY` environment variable
- This key has full access to all buckets and bypasses RLS

### 3. Test Upload (Optional)

To manually test the bucket works:

1. In Supabase Dashboard, go to **Storage** → **quotes** bucket
2. Try uploading a test PDF file
3. Verify you can create a signed URL for it

## Bucket Structure

PDFs are organized by year:

```
quotes/
├── 2026/
│   ├── {uuid-1}.pdf
│   ├── {uuid-2}.pdf
└── 2027/
    └── {uuid-3}.pdf
```

## Environment Variables

Ensure these are set in your `.env` and Vercel:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_STORAGE_BUCKET=quotes
```

## Troubleshooting

### Upload Fails

- Check that `SUPABASE_SERVICE_ROLE_KEY` is correct (not the anon key)
- Verify bucket name is exactly `quotes`
- Ensure bucket is created in the correct project

### Signed URL Fails

- Verify the PDF path doesn't include the bucket name (should be `2026/{uuid}.pdf`, not `quotes/2026/{uuid}.pdf`)
- Check that `PDF_URL_EXPIRY_SECONDS` is set and reasonable (default: 259200 = 72 hours)

### Retention Policy (Optional)

To automatically clean up old PDFs:

```sql
-- Run this in Supabase SQL Editor to delete PDFs older than 90 days
DELETE FROM storage.objects
WHERE bucket_id = 'quotes'
  AND created_at < NOW() - INTERVAL '90 days';
```

You can set this as a Supabase cron job if desired.

## Security Notes

- Bucket is **private** - files are not publicly accessible
- Signed URLs expire after configured time (default 72 hours)
- Service role key should NEVER be exposed to frontend
- Only backend/serverless functions should access this bucket
