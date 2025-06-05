-- Add created_by column to email_templates table
ALTER TABLE email_templates 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Make created_by NOT NULL after adding it (to handle existing rows)
UPDATE email_templates 
SET created_by = (
  SELECT id 
  FROM auth.users 
  WHERE role = 'super-admin' 
  LIMIT 1
)
WHERE created_by IS NULL;

ALTER TABLE email_templates 
ALTER COLUMN created_by SET NOT NULL;

-- Update RLS policies to check ownership
DROP POLICY IF EXISTS "Enable update for authenticated users" ON email_templates;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON email_templates;

CREATE POLICY "Enable update for authenticated users" ON email_templates
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Enable delete for authenticated users" ON email_templates
    FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by); 