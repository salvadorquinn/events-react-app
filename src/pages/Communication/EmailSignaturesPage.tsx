import { useState, useEffect } from 'react';
import { supabase } from '../../createClient';
import { EmailSignature } from '../../types/communication';
import { notify } from '../../utils/notifications';
import { logger } from '../../utils/logger';

export default function EmailSignaturesPage() {
  const [signatures, setSignatures] = useState<EmailSignature[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [editingSignature, setEditingSignature] = useState<EmailSignature | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    is_default: false
  });

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('email_signatures')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSignatures(data || []);
    } catch (error: any) {
      notify.error('Error fetching signatures');
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

      const signatureData = {
        ...formData,
        user_id: user.id
      };

      let error;
      if (editingSignature) {
        ({ error } = await supabase
          .from('email_signatures')
          .update(signatureData)
          .eq('id', editingSignature.id));
      } else {
        ({ error } = await supabase
          .from('email_signatures')
          .insert([signatureData]));
      }

      if (error) throw error;

      // If this is set as default, update other signatures
      if (formData.is_default) {
        await supabase
          .from('email_signatures')
          .update({ is_default: false })
          .neq('id', editingSignature?.id || 'new')
          .eq('user_id', user.id);
      }

      notify.success(editingSignature ? 'Signature updated' : 'Signature created');
      setShowSignatureModal(false);
      setEditingSignature(null);
      setFormData({ name: '', content: '', is_default: false });
      fetchSignatures();
    } catch (error: any) {
      notify.error('Error saving signature');
      logger.error('Error:', error);
    }
  };

  const handleEdit = (signature: EmailSignature) => {
    setEditingSignature(signature);
    setFormData({
      name: signature.name,
      content: signature.content,
      is_default: signature.is_default
    });
    setShowSignatureModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this signature?')) return;

    try {
      const { error } = await supabase
        .from('email_signatures')
        .delete()
        .eq('id', id);

      if (error) throw error;

      notify.success('Signature deleted');
      fetchSignatures();
    } catch (error: any) {
      notify.error('Error deleting signature');
      logger.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Email Signatures</h1>
            <button
              onClick={() => {
                setEditingSignature(null);
                setFormData({ name: '', content: '', is_default: false });
                setShowSignatureModal(true);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-[#9b1f62] text-white text-sm sm:text-base rounded-lg hover:bg-[#8a1b57] transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Signature
            </button>
          </div>

          {/* Signatures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8 text-white/70">
                Loading signatures...
              </div>
            ) : signatures.length === 0 ? (
              <div className="col-span-full text-center py-8 text-white/70">
                No signatures found. Create your first signature!
              </div>
            ) : (
              signatures.map((signature) => (
                <div
                  key={signature.id}
                  className="bg-white/5 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2 sm:mb-3">
                    <div className="w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-medium text-white mb-1">{signature.name}</h3>
                      {signature.is_default && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleEdit(signature)}
                        className="p-2 text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(signature.id)}
                        className="p-2 text-white/70 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-white/5"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-sm text-white/70 prose prose-invert max-w-none p-3 sm:p-4 bg-white/5 rounded-lg mt-2 sm:mt-3 overflow-hidden signature-preview"
                    style={{
                      wordBreak: 'break-word',
                      lineHeight: '1.5',
                      maxHeight: '150px',
                      overflowY: 'auto'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: signature.content.replace(/\n/g, '<br>') 
                    }}
                  />
                  <div className="mt-2 text-xs text-white/50">
                    Created {new Date(signature.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-[60]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar-light">
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex justify-between items-center p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editingSignature ? 'Edit Signature' : 'Create Signature'}
                </h2>
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Signature Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62]"
                    placeholder="Enter signature name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Signature Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    required
                    rows={6}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-[#9b1f62] focus:border-[#9b1f62] font-mono"
                    placeholder="Enter signature content (HTML supported)"
                  />
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    HTML formatting is supported. Use {'{name}'} for dynamic name insertion.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preview
                  </label>
                  <div 
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-[100px] prose max-w-none text-sm sm:text-base"
                    style={{
                      wordBreak: 'break-word',
                      lineHeight: '1.5',
                    }}
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={formData.is_default}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_default: e.target.checked }))}
                    className="h-4 w-4 text-[#9b1f62] focus:ring-[#9b1f62] border-gray-300 rounded"
                  />
                  <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                    Set as default signature
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSignatureModal(false)}
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-[#9b1f62] text-white rounded-lg hover:bg-[#8a1b57] transition-colors duration-200"
                  >
                    {editingSignature ? 'Save Changes' : 'Create Signature'}
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