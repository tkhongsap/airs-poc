import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './SmartSubmissionForm.css';
import { getAISuggestions, submitIssue } from '../../services/api';

interface FormData {
  title: string;
  description: string;
  priority: string;
  type: string;
  attachments: File[];
}

const SmartSubmissionForm: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: 'medium',
    type: 'bug',
    attachments: []
  });
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'description' && value.length > 50) {
      setIsLoading(true);
      try {
        const suggestions = await getAISuggestions(value);
        setAiSuggestions(suggestions);
      } catch (error) {
        console.error('Error getting AI suggestions:', error);
      }
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitIssue(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting issue:', error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[200px]"
          required
        />
        {isLoading && <div className="text-sm text-gray-500">Getting AI suggestions...</div>}
        {aiSuggestions && (
          <div className="mt-2 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2">AI Suggestions</h4>
            {/* Render AI suggestions */}
          </div>
        )}
      </div>

      {/* Priority Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="bug">Bug</option>
          <option value="feature">Feature Request</option>
          <option value="improvement">Improvement</option>
          <option value="documentation">Documentation</option>
        </select>
      </div>

      {/* File Attachments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachments
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Add Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
          />
          <span className="text-sm text-gray-500">
            {formData.attachments.length} files selected
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? 'Submitting...' : 'Submit Issue'}
        </button>
      </div>
    </form>
  );
};

export default SmartSubmissionForm; 