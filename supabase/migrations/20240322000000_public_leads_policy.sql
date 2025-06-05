-- Drop existing policies
DROP POLICY IF EXISTS "Marketing team can insert leads" ON leads;

-- Create new combined insert policy for leads
CREATE POLICY "Insert leads policy"
  ON leads FOR INSERT
  TO public
  WITH CHECK (
    source = 'event_form' OR 
    (auth.has_marketing_access() AND source != 'event_form')
  );

-- Add policy to allow public form submissions to communications table
CREATE POLICY "Allow public form communications"
  ON communications FOR INSERT
  TO public
  WITH CHECK (
    type = 'form' 
    AND direction = 'incoming'
    AND status = 'sent'
  ); 