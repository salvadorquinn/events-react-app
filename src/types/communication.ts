export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  content?: string;
  html_content?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type EmailSignature = {
  id: string;
  name: string;
  content: string;
  is_default: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type Communication = {
  id: string;
  lead_id: string;
  direction: 'incoming' | 'outgoing';
  type: 'email' | 'form' | 'note';
  subject?: string;
  content: string;
  template_id?: string;
  signature_id?: string;
  sent_by?: string;
  sent_at: string;
  status: 'pending' | 'sent' | 'failed' | 'draft';
};

export type ContactForm = {
  id: string;
  name: string;
  fields: FormField[];
  success_message?: string;
  redirect_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type FormField = {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  options?: string[];
  placeholder?: string;
};

export type FormSubmission = {
  id: string;
  form_id: string;
  lead_id: string;
  data: Record<string, any>;
  created_at: string;
}; 