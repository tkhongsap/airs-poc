import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApiTest.css';

const ApiTest = () => {
  const [apiInfo, setApiInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        setApiInfo(response.data);
      } catch (err) {
        setError('Failed to connect to the backend');
        console.error('Error:', err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="api-test error">
        <h2>API Connection Test</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="api-test">
      <h2>API Connection Test</h2>
      {apiInfo && (
        <div className="api-info">
          <div className="status-badge" data-status={apiInfo.status}>
            {apiInfo.status}
          </div>
          
          <div className="info-section">
            <h3>{apiInfo.message}</h3>
            <p>Version: {apiInfo.version}</p>
            <p>Environment: {apiInfo.environment}</p>
          </div>

          <div className="api-routes">
            <h4>Available Routes:</h4>
            <ul>
              {Object.entries(apiInfo.api_routes).map(([key, value]) => (
                <li key={key}>
                  <span className="route-name">{key}:</span>
                  <a href={`http://localhost:8000${value}`} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest; 