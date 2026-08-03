export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const calculateGrowth = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const getStatusColor = (status) => {
  const colors = {
    completed: '#10b981',
    pending: '#f59e0b',
    refunded: '#ef4444',
    failed: '#dc2626',
  };
  return colors[status] || '#6b7280';
};