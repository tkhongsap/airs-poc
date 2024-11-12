import React from 'react';
import { useNavigate } from 'react-router-dom';
import SmartSubmissionForm from '../components/SmartSubmissionForm';

const NewIssue = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AIRS</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Create New Issue</h2>
          <SmartSubmissionForm />
        </div>
      </main>
    </div>
  );
};

export default NewIssue; 