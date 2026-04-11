import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// The JWT interceptor has been removed for testing

export default api;