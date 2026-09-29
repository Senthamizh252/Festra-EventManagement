import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('festra_token', response.data.token);
      localStorage.setItem('festra_user', JSON.stringify(response.data.user || response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('festra_token', response.data.token);
      localStorage.setItem('festra_user', JSON.stringify(response.data.user || response.data));
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('festra_token');
    localStorage.removeItem('festra_user');
  }
};

export default authService;
