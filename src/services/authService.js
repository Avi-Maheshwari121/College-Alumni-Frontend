import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    // Look for the token in the response and save it
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user || {})); 
    }
    
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    
    // Save token on successful registration as well
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user || {}));
    }
    
    return response.data;
  },

  logout: () => {
    // Clear the token and user data to securely log out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check authentication status by verifying if a token exists
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};