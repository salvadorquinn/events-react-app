import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';
import { ContactForm, FormField } from '../../types/communication';
import { notify } from '../../utils/notifications';
import { logger } from '../../utils/logger';

export default function ContactFormBuilder() {
  const [forms, setForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingForm, setEditingForm] = useState<ContactForm | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    fields: [] as FormField[],
    success_message: 'Thank you for your submission!',
    redirect_url: ''
  });

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setForms(data || []);
    } catch (error: any) {
      notify.error('Error fetching forms');
      logger.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const formDataToSubmit = {
        ...formData,
        created_by: user.id
      };

      let error;
      if (editingForm) {
        ({ error } = await supabase
          .from('contact_forms')
          .update(formDataToSubmit)
          .eq('id', editingForm.id));
      } else {
        ({ error } = await supabase
          .from('contact_forms')
          .insert([formDataToSubmit]));
      }

      if (error) throw error;

      notify.success(editingForm ? 'Form updated' : 'Form created');
      setShowFormModal(false);
      setEditingForm(null);
      setFormData({
        name: '',
        fields: [],
        success_message: 'Thank you for your submission!',
        redirect_url: ''
      });
      fetchForms();
    } catch (error: any) {
      notify.error('Error saving form');
      logger.error('Error:', error);
    }
  };

  const handleAddField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      name: '',
      label: '',
      type: 'text',
      required: false,
      placeholder: ''
    };
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const handleFieldChange = (index: number, field: Partial<FormField>) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => i === index ? { ...f, ...field } : f)
    }));
  };

  const handleRemoveField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const handleEdit = (form: ContactForm) => {
    setEditingForm(form);
    setFormData({
      name: form.name,
      fields: form.fields,
      success_message: form.success_message || 'Thank you for your submission!',
      redirect_url: form.redirect_url || ''
    });
    setShowFormModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this form?')) return;

    try {
      const { error } = await supabase
        .from('contact_forms')
        .delete()
        .eq('id', id);

      if (error) throw error;

      notify.success('Form deleted');
      fetchForms();
    } catch (error: any) {
      notify.error('Error deleting form');
      logger.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Contact Form Builder</h1>
            <button
              onClick={() => {
                setEditingForm(null);
                setFormData({
                  name: '',
                  fields: [],
                  success_message: 'Thank you for your submission!',
                  redirect_url: ''
                });
                setShowFormModal(true);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-[#9b1f62] text-white text-sm sm:text-base rounded-lg hover:bg-[#8a1b57] transition-colors duration-200"
            >
              Create Form
            </button>
          </div>

          {/* Forms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {loading ? (
              <div className="col-span-full text-center py-6 sm:py-8 text-white/70">
                Loading forms...
              </div>
            ) : forms.length === 0 ? (
              <div className="col-span-full text-center py-6 sm:py-8 text-white/70">
                No forms found. Create your first form!
              </div>
            ) : (
              forms.map((form) => (
                <div
                  key={form.id}
                  className="bg-white/5 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-base sm:text-lg font-medium text-white">{form.name}</h3>
                    <div className="flex space-x-2 shrink-0">
                      <button
                        onClick={() => handleEdit(form)}
                        className="p-1.5 text-white/70 hover:text-white transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
                        className="p-1.5 text-white/70 hover:text-red-400 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/70">
                      {form.fields.length} field{form.fields.length === 1 ? '' : 's'}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {form.fields.map((field) => (
                        <span
                          key={field.id}
                          className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/10 text-xs text-white/90"
                        >
                          {field.label}
                          {field.required && <span className="text-red-400 ml-1">*</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-white/50">
                    Created {new Date(form.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 z-[60] overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-4 sm:my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex justify-between items-center p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editingForm ? 'Edit Form' : 'Create Form'}
                </h2>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                    placeholder="Enter form name"
                  />
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Form Fields
                    </label>
                    <button
                      type="button"
                      onClick={handleAddField}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 bg-[#9b1f62] text-white text-sm rounded-lg hover:bg-[#8a1b57] transition-colors duration-200"
                    >
                      Add Field
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.fields.map((field, index) => (
                      <div key={field.id} className="bg-gray-50 rounded-lg p-3 sm:p-4 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveField(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field Name
                            </label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                              required
                              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                              placeholder="e.g., first_name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field Label
                            </label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => handleFieldChange(index, { label: e.target.value })}
                              required
                              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                              placeholder="e.g., First Name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field Type
                            </label>
                            <select
                              value={field.type}
                              onChange={(e) => handleFieldChange(index, { type: e.target.value as FormField['type'] })}
                              required
                              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                            >
                              <option value="text">Text</option>
                              <option value="email">Email</option>
                              <option value="phone">Phone</option>
                              <option value="textarea">Text Area</option>
                              <option value="select">Select</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="radio">Radio</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Placeholder
                            </label>
                            <input
                              type="text"
                              value={field.placeholder}
                              onChange={(e) => handleFieldChange(index, { placeholder: e.target.value })}
                              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                              placeholder="Enter placeholder text"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => handleFieldChange(index, { required: e.target.checked })}
                                className="h-4 w-4 text-[#9b1f62] focus:ring-[#9b1f62] border-gray-300 rounded"
                              />
                              <span className="text-sm font-medium text-gray-700">Required field</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}

                    {formData.fields.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No fields added yet. Click "Add Field" to start building your form.
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Success Message
                  </label>
                  <input
                    type="text"
                    value={formData.success_message}
                    onChange={(e) => setFormData(prev => ({ ...prev, success_message: e.target.value }))}
                    required
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                    placeholder="Message to show after successful submission"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Redirect URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.redirect_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, redirect_url: e.target.value }))}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                    placeholder="https://example.com/thank-you"
                  />
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Leave empty to show the success message instead.
                  </p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-[#9b1f62] text-white rounded-lg hover:bg-[#8a1b57] transition-colors duration-200"
                  >
                    {editingForm ? 'Save Changes' : 'Create Form'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 