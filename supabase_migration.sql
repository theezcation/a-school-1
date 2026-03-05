-- Run this in your Supabase SQL editor
CREATE TABLE IF NOT EXISTS site_leads (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: enable Row Level Security and allow inserts from anon
ALTER TABLE site_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon inserts" ON site_leads
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON site_leads
  FOR SELECT TO authenticated
  USING (true);
