-- Create tables first
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    source TEXT,
    status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id),
    direction TEXT NOT NULL CHECK (direction IN ('incoming', 'outgoing')),
    type TEXT NOT NULL CHECK (type IN ('email', 'form', 'note')),
    subject TEXT,
    content TEXT NOT NULL,
    template_id UUID REFERENCES email_templates(id),
    signature_id UUID REFERENCES email_signatures(id),
    sent_by UUID REFERENCES auth.users(id),
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL CHECK (status IN ('pending', 'sent', 'failed', 'draft'))
);

CREATE TABLE IF NOT EXISTS contact_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    fields JSONB NOT NULL DEFAULT '[]'::JSONB,
    success_message TEXT,
    redirect_url TEXT,
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id UUID NOT NULL REFERENCES contact_forms(id),
    lead_id UUID NOT NULL REFERENCES leads(id),
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON email_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_signatures_updated_at
    BEFORE UPDATE ON email_signatures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_forms_updated_at
    BEFORE UPDATE ON contact_forms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on all communication tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create a function to check if user has marketing access
CREATE OR REPLACE FUNCTION auth.has_marketing_access()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND role IN ('super-admin', 'admin', 'marketing-supervisor', 'marketing', 'marketing-intern')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user is admin or above
CREATE OR REPLACE FUNCTION auth.is_admin_or_above()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND role IN ('super-admin', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Leads table policies
CREATE POLICY "Marketing team can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (auth.has_marketing_access());

CREATE POLICY "Marketing team can insert leads"
  ON leads FOR INSERT
  TO authenticated
  WITH CHECK (auth.has_marketing_access());

CREATE POLICY "Marketing team can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (auth.has_marketing_access());

CREATE POLICY "Only admin and above can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (auth.is_admin_or_above());

-- Email templates policies
CREATE POLICY "Marketing team can view templates"
  ON email_templates FOR SELECT
  TO authenticated
  USING (auth.has_marketing_access());

CREATE POLICY "Marketing team can create templates"
  ON email_templates FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.has_marketing_access() 
    AND auth.uid() = created_by
  );

CREATE POLICY "Users can update own templates, admins can update any"
  ON email_templates FOR UPDATE
  TO authenticated
  USING (
    auth.is_admin_or_above() 
    OR (auth.has_marketing_access() AND auth.uid() = created_by)
  );

CREATE POLICY "Only admin and above can delete templates"
  ON email_templates FOR DELETE
  TO authenticated
  USING (auth.is_admin_or_above());

-- Email signatures policies
CREATE POLICY "Users can view own signatures"
  ON email_signatures FOR SELECT
  TO authenticated
  USING (
    auth.has_marketing_access() 
    AND auth.uid() = user_id
  );

CREATE POLICY "Users can create own signatures"
  ON email_signatures FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.has_marketing_access() 
    AND auth.uid() = user_id
  );

CREATE POLICY "Users can update own signatures"
  ON email_signatures FOR UPDATE
  TO authenticated
  USING (
    auth.has_marketing_access() 
    AND auth.uid() = user_id
  );

CREATE POLICY "Users can delete own signatures"
  ON email_signatures FOR DELETE
  TO authenticated
  USING (
    auth.has_marketing_access() 
    AND auth.uid() = user_id
  );

-- Communications policies
CREATE POLICY "Marketing team can view communications"
  ON communications FOR SELECT
  TO authenticated
  USING (auth.has_marketing_access());

CREATE POLICY "Marketing team can send communications"
  ON communications FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.has_marketing_access() 
    AND auth.uid() = sent_by
  );

CREATE POLICY "Users can update own communications, admins can update any"
  ON communications FOR UPDATE
  TO authenticated
  USING (
    auth.is_admin_or_above() 
    OR (auth.has_marketing_access() AND auth.uid() = sent_by)
  );

CREATE POLICY "Only admin and above can delete communications"
  ON communications FOR DELETE
  TO authenticated
  USING (auth.is_admin_or_above());

-- Contact forms policies
CREATE POLICY "Marketing team can view forms"
  ON contact_forms FOR SELECT
  TO authenticated
  USING (auth.has_marketing_access());

CREATE POLICY "Marketing team can create forms"
  ON contact_forms FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.has_marketing_access() 
    AND auth.uid() = created_by
  );

CREATE POLICY "Users can update own forms, admins can update any"
  ON contact_forms FOR UPDATE
  TO authenticated
  USING (
    auth.is_admin_or_above() 
    OR (auth.has_marketing_access() AND auth.uid() = created_by)
  );

CREATE POLICY "Only admin and above can delete forms"
  ON contact_forms FOR DELETE
  TO authenticated
  USING (auth.is_admin_or_above());

-- Form submissions policies
CREATE POLICY "Marketing team can view submissions"
  ON form_submissions FOR SELECT
  TO authenticated
  USING (auth.has_marketing_access());

CREATE POLICY "Anyone can submit forms"
  ON form_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only admin and above can delete submissions"
  ON form_submissions FOR DELETE
  TO authenticated
  USING (auth.is_admin_or_above());

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_communications_lead_id ON communications(lead_id);
CREATE INDEX IF NOT EXISTS idx_communications_sent_at ON communications(sent_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_id ON form_submissions(form_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at); 