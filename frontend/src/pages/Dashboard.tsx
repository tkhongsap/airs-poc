import React from 'react';
import { useNavigate } from 'react-router-dom';
import RealTimeDashboard from '../components/RealTimeDashboard';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AIRS</h1>
          <button
            onClick={() => navigate('/new-issue')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Issue
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <RealTimeDashboard />
      </main>
    </div>
  );
};

export default Dashboard; 