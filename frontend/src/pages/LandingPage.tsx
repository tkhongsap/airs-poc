import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">AIRS</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-8">
            Resolve Issues
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {" "}Smarter{" "}
            </span>
            with AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Streamline your development workflow with AI-powered issue resolution. 
            Get intelligent suggestions, automated classifications, and real-time assistance.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="bg-gray-100 text-gray-700 text-lg px-8 py-4 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              title="AI-Powered Suggestions"
              description="Get intelligent recommendations and solutions based on historical data and best practices."
              icon="🤖"
            />
            <FeatureCard
              title="Smart Classification"
              description="Automatically categorize and prioritize issues using advanced AI algorithms."
              icon="🎯"
            />
            <FeatureCard
              title="Real-Time Assistance"
              description="Receive instant help and guidance during issue submission and resolution."
              icon="⚡"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 