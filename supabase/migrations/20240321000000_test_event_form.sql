-- Drop the test_event_submissions table
DROP TABLE IF EXISTS test_event_submissions;

-- Create the test_event_submissions table
CREATE TABLE test_event_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE test_event_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert
CREATE POLICY "Allow anyone to insert submissions" ON test_event_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to view all submissions
CREATE POLICY "Allow authenticated users to view submissions" ON test_event_submissions
  FOR SELECT
  TO authenticated
  USING (true); 