import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getAISuggestions = async (text: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/ai/suggestions`, { text });
    return response.data;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    throw error;
  }
};

export const submitIssue = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/issues`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting issue:', error);
    throw error;
  }
}; 