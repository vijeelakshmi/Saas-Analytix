import api from './api';

export const authService = {
  login: (credentials) => api.post('/users/login/', credentials),
  register: (userData) => api.post('/users/register/', userData),
  logout: () => api.post('/users/logout/'),
  refreshToken: (refresh) => api.post('/users/refresh/', { refresh }),
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (data) => api.put('/users/profile/', data),
};