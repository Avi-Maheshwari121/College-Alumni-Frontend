import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:30018/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// The JWT interceptor has been removed for testing

export default api;
