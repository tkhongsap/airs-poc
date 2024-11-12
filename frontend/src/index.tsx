import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Type assertion for root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create root with type assertion
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Define the reportWebVitals callback type
const reportWebVitalsCallback = (metric: any) => {
  console.log(metric);
};

// Report web vitals with typed callback
reportWebVitals(reportWebVitalsCallback); 