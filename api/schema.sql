-- Squeegee Samurai – quotes table (PostgreSQL)
-- Run once in Supabase SQL editor or your Postgres client.

CREATE TABLE IF NOT EXISTS quotes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  address           TEXT,
  city              TEXT,
  zip_code          TEXT,

  property_type     TEXT,
  service_type      TEXT,
  segment           TEXT,

  form_input        JSONB NOT NULL DEFAULT '{}',
  quote_breakdown   JSONB NOT NULL DEFAULT '{}',
  quote_total_cents INT NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'USD',

  image_urls        TEXT[],
  status            TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes (status);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes (email);

-- ============================================================
-- PDF & Email Tracking Migration
-- Add these columns to existing quotes table for PDF generation
-- ============================================================

ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pdf_path TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pdf_generated_at TIMESTAMPTZ;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pdf_url_expires_at TIMESTAMPTZ;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;

-- Optional but recommended: Track PDF/email status for debugging
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pdf_status TEXT DEFAULT 'pending';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS email_status TEXT DEFAULT 'pending';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS email_error TEXT;

-- Optional robustness: Track when objects/URLs were created (signed URLs expire)
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pdf_object_created_at TIMESTAMPTZ;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS signed_url_last_generated_at TIMESTAMPTZ;

-- Indexes for PDF tracking
CREATE INDEX IF NOT EXISTS idx_quotes_pdf_path ON quotes (pdf_path) WHERE pdf_path IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_quotes_pdf_status ON quotes (pdf_status);
