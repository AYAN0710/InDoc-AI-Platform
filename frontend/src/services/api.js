import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  timeout: 300000, // 300s timeout for RAG processing / document analysis
});

// Response interceptor for unified error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.response) {
      // Server returned error status
      errorMessage = error.response.data?.detail || error.response.data?.message || `Server error (${error.response.status})`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Unable to reach backend server. Please check if the API is running at ' + API_BASE_URL;
    } else {
      errorMessage = error.message;
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
