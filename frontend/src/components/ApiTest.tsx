import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        setMessage(response.data.message);
      } catch (err) {
        setError('Failed to connect to the backend');
        console.error('Error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>API Test</h2>
      {message && <p>Message from backend: {message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ApiTest; 