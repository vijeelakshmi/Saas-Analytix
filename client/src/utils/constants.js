export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

export const TRANSACTION_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  REFUNDED: 'refunded',
  FAILED: 'failed',
};

export const TRANSACTION_CATEGORIES = {
  SAAS: 'saas',
  SUPPORT: 'support',
  CONSULTING: 'consulting',
  API: 'api',
};

export const CHART_COLORS = {
  primary: '#ec4899',
  secondary: '#f472b6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 10,
};