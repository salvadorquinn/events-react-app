import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';
import { EmailTemplate, EmailSignature, Lead } from '../../types/communication';
import { notify } from '../../utils/notifications';
import { X, Send, FileText, ChevronDown } from 'lucide-react';
import { logger } from '../../utils/logger';

type EmailComposerProps = {
  lead: Lead;
  onClose: () => void;
  onSend: () => void;
};

export default function EmailComposer({ lead, onClose, onSend }: EmailComposerProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [signatures, setSignatures] = useState<EmailSignature[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedSignature, setSelectedSignature] = useState<string>('');
  const [emailData, setEmailData] = useState({
    subject: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplatesAndSignatures();
  }, []);

  const fetchTemplatesAndSignatures = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Fetch templates
      const { data: templatesData, error: templatesError } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (templatesError) throw templatesError;
      setTemplates(templatesData || []);

      // Fetch signatures
      const { data: signaturesData, error: signaturesError } = await supabase
        .from('email_signatures')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (signaturesError) throw signaturesError;
      setSignatures(signaturesData || []);

      // Set default signature if available
      const defaultSignature = signaturesData?.find(sig => sig.is_default);
      if (defaultSignature) {
        setSelectedSignature(defaultSignature.id);
      }
    } catch (error: any) {
      notify.error('Error loading templates and signatures');
      logger.error('Error:', error);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    // If empty template is selected, reset the form
    if (!templateId) {
      setEmailData({
        subject: '',
        content: ''
      });
      setSelectedTemplate('');
      return;
    }

    const template = templates.find(t => t.id === templateId);
    if (template) {
      let content = template.html_content || template.content || '';
      // Replace placeholders with lead data
      content = content.replace(/{name}/g, lead.name || '');
      content = content.replace(/{email}/g, lead.email || '');

      setEmailData({
        subject: template.subject || '',
        content: content
      });
      setSelectedTemplate(templateId);
    }
  };

  const handleSignatureSelect = (signatureId: string) => {
    setSelectedSignature(signatureId);
  };

  const handleSend = async () => {
    if (!emailData.subject.trim() || !emailData.content.trim()) {
      notify.error('Please fill in both subject and content');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const signature = signatures.find(s => s.id === selectedSignature);
      const finalContent = signature
        ? `${emailData.content}\n\n${signature.content}`
        : emailData.content;

      const { error } = await supabase
        .from('communications')
        .insert([{
          lead_id: lead.id,
          direction: 'outgoing',
          type: 'email',
          subject: emailData.subject,
          content: finalContent,
          template_id: selectedTemplate || null,
          signature_id: selectedSignature || null,
          sent_by: user.id,
          status: 'sent'
        }]);

      if (error) throw error;

      notify.success('Email sent successfully');
      onSend();
      onClose();
    } catch (error: any) {
      notify.error('Error sending email');
      logger.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 z-50">
      <div className="bg-white w-full h-full sm:h-[90vh] sm:max-w-3xl sm:rounded-xl shadow-2xl flex flex-col">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors duration-200 sm:hidden"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  New Message
                </h2>
                <p className="text-sm text-gray-600 hidden sm:block">To: {lead.name} ({lead.email})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hidden sm:flex p-1.5 hover:bg-gray-200 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Recipient - only shown on mobile */}
          <div className="sm:hidden px-4 py-2 border-b">
            <p className="text-sm text-gray-600">To: {lead.name} ({lead.email})</p>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {/* Template Selection */}
              <div className="relative">
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent appearance-none transition-all duration-200 hover:bg-gray-50"
                >
                  <option value="">Select a template</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-[50%] transform -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Subject */}
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                required
                className="w-full px-4 py-2.5 bg-transparent border-0 border-b border-gray-200 focus:ring-0 focus:border-[#9b1f62] transition-colors duration-200 text-base sm:text-lg placeholder-gray-400"
                placeholder="Subject"
              />

              {/* Content */}
              <div className="min-h-[200px] sm:min-h-[300px]">
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  className="w-full h-full min-h-[200px] px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent transition-all duration-200 prose max-w-none [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400 [&:empty]:before:pointer-events-none"
                  dangerouslySetInnerHTML={{ __html: emailData.content }}
                  data-placeholder="Write your message here..."
                  onInput={(e) => {
                    const content = e.currentTarget.innerHTML;
                    setEmailData(prev => ({ ...prev, content }));
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text');
                    document.execCommand('insertHTML', false, text);
                  }}
                />
              </div>

              {/* Signature Selection */}
              <div className="space-y-2">
                <select
                  value={selectedSignature}
                  onChange={(e) => handleSignatureSelect(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent appearance-none transition-all duration-200 hover:bg-gray-50"
                >
                  <option value="">No signature</option>
                  {signatures.map((signature) => (
                    <option key={signature.id} value={signature.id}>
                      {signature.name}
                    </option>
                  ))}
                </select>

                {/* Signature Preview */}
                {selectedSignature && (
                  <div 
                    className="prose max-w-none p-4 bg-gray-50 rounded-lg text-sm border border-gray-200"
                    dangerouslySetInnerHTML={{ 
                      __html: signatures.find(s => s.id === selectedSignature)?.content || ''
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-500">
              {selectedTemplate && (
                <span className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>Using: {templates.find(t => t.id === selectedTemplate)?.name}</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-2 bg-[#9b1f62] text-white rounded-lg hover:bg-[#8a1b57] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}