import React, { useState, useEffect } from 'react';
import { supabase } from '../../createClient';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { notify } from '../../utils/notifications';
import EmailTemplateEditor from '../../components/email/EmailTemplateEditor';
import { logger } from '../../utils/logger';

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  html_content: string;
  css_content: string;
  created_at: string;
  updated_at: string;
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateSubject, setTemplateSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      notify.error('Error fetching templates: ' + error.message);
      logger.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!templateName || !templateSubject) {
      notify.error('Please provide both template name and subject');
      return;
    }

    try {
      setLoading(true);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      // Check for duplicate name
      const { data: existing } = await supabase
        .from('email_templates')
        .select('id')
        .eq('name', templateName)
        .single();

      if (existing) {
        notify.error('A template with this name already exists');
        return;
      }

      const { data, error } = await supabase
        .from('email_templates')
        .insert({
          name: templateName,
          subject: templateSubject,
          html_content: '',
          css_content: '',
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      notify.success('Template created successfully');
      setTemplates([data, ...templates]);
      setSelectedTemplate(data);
      setIsCreating(false);
      setIsEditing(true);
      resetForm();
    } catch (error: any) {
      notify.error('Error creating template: ' + error.message);
      logger.error('Error creating template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async (html: string, css: string) => {
    if (!selectedTemplate) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('email_templates')
        .update({
          html_content: html,
          css_content: css,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      notify.success('Template saved successfully');
      await fetchTemplates();
      setIsEditing(false);
    } catch (error: any) {
      notify.error('Error saving template: ' + error.message);
      logger.error('Error saving template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (id: number) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      notify.success('Template deleted successfully');
      setTemplates(templates.filter(t => t.id !== id));
      if (selectedTemplate?.id === id) {
        setSelectedTemplate(null);
        setIsEditing(false);
      }
    } catch (error: any) {
      notify.error('Error deleting template: ' + error.message);
      logger.error('Error deleting template:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTemplateName('');
    setTemplateSubject('');
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isEditing && selectedTemplate) {
    return (
      <EmailTemplateEditor
        initialHtml={selectedTemplate.html_content}
        initialCss={selectedTemplate.css_content}
        onSave={handleSaveTemplate}
        onCancel={() => setIsEditing(false)}
        isSaving={loading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Email Templates</h1>
            {!isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 bg-[#9b1f62] text-white text-sm sm:text-base rounded-lg hover:bg-[#8a1b57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                New Template
              </button>
            )}
          </div>

          {isCreating ? (
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">Create New Template</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={templateSubject}
                    onChange={(e) => setTemplateSubject(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter email subject"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      resetForm();
                    }}
                    disabled={loading}
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTemplate}
                    disabled={loading || !templateName || !templateSubject}
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-white bg-[#9b1f62] rounded-lg hover:bg-[#8a1b57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full px-4 py-2 pl-10 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent"
                />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading && filteredTemplates.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-white">
                    Loading templates...
                  </div>
                ) : filteredTemplates.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-white">
                    {searchQuery ? 'No templates found matching your search.' : 'No templates found. Create your first template!'}
                  </div>
                ) : (
                  filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white/5 backdrop-blur-md rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-colors cursor-pointer group"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsEditing(true);
                      }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2 sm:mb-3">
                        <div className="w-full sm:w-auto">
                          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#9b1f62] transition-colors mb-1">
                            {template.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-white/70">{template.subject}</p>
                        </div>
                        <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTemplate(template);
                              setIsEditing(true);
                            }}
                            className="p-2 text-white/70 hover:text-[#9b1f62] hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTemplate(template.id);
                            }}
                            className="p-2 text-white/70 hover:text-red-500 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-white/50">
                        Last updated: {new Date(template.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 