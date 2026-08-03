import api from './api';

export const dashboardService = {
  getKPIData: () => api.get('/dashboard/kpi_data/'),
  getRevenueTrend: () => api.get('/dashboard/revenue_trend/'),
  getSalesByCategory: () => api.get('/dashboard/sales_by_category/'),
  getUserSegments: () => api.get('/dashboard/user_segments/'),
  getTransactions: (params) => api.get('/transactions/', { params }),
  createTransaction: (data) => api.post('/transactions/', data),
  updateTransaction: (id, data) => api.put(`/transactions/${id}/`, data),
  deleteTransaction: (id) => api.delete(`/transactions/${id}/`),
  getTransactionSummary: () => api.get('/transactions/summary/'),
};