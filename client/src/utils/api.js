import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the authentication token to requests
api.interceptors.request.use(
  (config) => {
    // Get user data from localStorage (zustand persist middleware stores it there)
    const userData = JSON.parse(localStorage.getItem('zustand-store'));
    const token = userData?.state?.user?.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 