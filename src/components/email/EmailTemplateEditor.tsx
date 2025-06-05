import React, { useState, useEffect } from 'react';
import { Eye, Code2, Save, ArrowLeft } from 'lucide-react';

interface EmailTemplateEditorProps {
  initialHtml?: string;
  initialCss?: string;
  onSave: (html: string, css: string) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({
  initialHtml = '',
  initialCss = '',
  onSave,
  onCancel,
  isSaving = false
}) => {
  const [isCodeView, setIsCodeView] = useState(true);
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');

  const handleSave = () => {
    onSave(htmlCode, cssCode);
  };

  const defaultTemplate = `<div class="email-content">
  <div class="header">
    <h1>Welcome to StudyNet!</h1>
  </div>
  <div class="content">
    <p>Dear {name},</p>
    <p>Thank you for your interest in studying with us.</p>
    <p>We look forward to helping you achieve your educational goals.</p>
    <p>Best regards,<br>StudyNet Team</p>
  </div>
</div>`;

  const defaultCss = `/* Add your CSS styles here */
.email-content {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
}

.header {
  background: #f5f5f5;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}

.content {
  padding: 20px 0;
  line-height: 1.6;
  color: #333333;
}

h1 {
  color: #9b1f62;
  margin: 0;
}

p {
  margin: 1em 0;
}`;

  useEffect(() => {
    if (!htmlCode && !cssCode) {
      setHtmlCode(defaultTemplate);
      setCssCode(defaultCss);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={onCancel}
                className="flex items-center px-2 sm:px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                Back
              </button>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Email Template Editor</h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={() => setIsCodeView(!isCodeView)}
                className="flex-1 sm:flex-none flex items-center justify-center px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isCodeView ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                ) : (
                  <>
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </>
                )}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 sm:flex-none flex items-center justify-center px-4 py-1.5 text-sm text-white bg-[#9b1f62] rounded-lg hover:bg-[#8a1b57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
            {/* Code Editor */}
            {isCodeView && (
              <div className="border-b lg:border-b-0 lg:border-r border-gray-200">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('html')}
                      className={`flex-1 lg:flex-none px-4 py-2 text-sm font-medium ${
                        activeTab === 'html'
                          ? 'text-[#9b1f62] border-b-2 border-[#9b1f62]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      HTML
                    </button>
                    <button
                      onClick={() => setActiveTab('css')}
                      className={`flex-1 lg:flex-none px-4 py-2 text-sm font-medium ${
                        activeTab === 'css'
                          ? 'text-[#9b1f62] border-b-2 border-[#9b1f62]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      CSS
                    </button>
                  </div>
                </div>
                <div className="h-[calc(100%-41px)] p-3 sm:p-4">
                  <textarea
                    value={activeTab === 'html' ? htmlCode : cssCode}
                    onChange={(e) => 
                      activeTab === 'html' 
                        ? setHtmlCode(e.target.value)
                        : setCssCode(e.target.value)
                    }
                    placeholder={activeTab === 'html' ? defaultTemplate : defaultCss}
                    className="w-full h-full px-3 py-2 text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1f62] focus:border-transparent resize-none"
                    spellCheck={false}
                  />
                </div>
              </div>
            )}

            {/* Preview */}
            <div className={`h-full overflow-auto ${isCodeView ? 'hidden lg:block' : 'block'}`}>
              <div className="h-full p-3 sm:p-4">
                <div className="bg-white rounded-lg shadow p-3 sm:p-4 min-h-full">
                  <style>{cssCode}</style>
                  <div
                    dangerouslySetInnerHTML={{ __html: htmlCode }}
                    className="prose max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditor; 