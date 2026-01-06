import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5215',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const problemDetails = error.response?.data;
    if (problemDetails && problemDetails.title) {
      // Could dispatch to a global error store here
      console.error(`Backend Error: ${problemDetails.title}`);
    }
    return Promise.reject(error);
  }
);

export default api;
