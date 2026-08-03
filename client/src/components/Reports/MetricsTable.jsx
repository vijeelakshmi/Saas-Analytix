import React, { useState } from 'react';
import { format } from 'date-fns';
import './Reports.css';

const MetricsTable = ({ data, isLoading, onSort, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'created_at',
    direction: 'desc'
  });

  // Handle sorting
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    if (onSort) {
      onSort(key, direction);
    }
  };

  // Format currency with 4 decimal places
  const formatCurrency = (amount, decimalPlaces = 4) => {
    if (!amount && amount !== 0) return '$0.0000';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(amount);
  };

  // Format number with decimal places
  const formatNumber = (number, decimalPlaces = 4) => {
    if (!number && number !== 0) return '0.0000';
    return number.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const classes = {
      completed: 'badge--success',
      pending: 'badge--warning',
      refunded: 'badge--danger',
      failed: 'badge--danger',
    };
    return classes[status] || 'badge--secondary';
  };

  // Get category badge class
  const getCategoryBadgeClass = (category) => {
    const classes = {
      saas: 'badge--info',
      support: 'badge--warning',
      consulting: 'badge--success',
      api: 'badge--purple',
    };
    return classes[category] || 'badge--secondary';
  };

  // Calculate totals with decimal precision
  const totalRevenue = data?.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0) || 0;
  const averageTransaction = data?.length > 0 ? totalRevenue / data.length : 0;

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!data || !sortConfig.key) return data || [];
    
    return [...data].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'amount') {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      }
      
      if (sortConfig.key === 'created_at') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (isLoading) {
    return (
      <div className="metrics-table__loading">
        <div className="loading-spinner"></div>
        <p>Loading metrics data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="metrics-table__empty">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3>No data available</h3>
        <p>Try adjusting your filters or check back later</p>
      </div>
    );
  }

  return (
    <div className="metrics-table">
      <div className="metrics-table__header">
        <h3 className="metrics-table__title">
          📊 Transaction Metrics
          <span className="precision-badge">4 decimal precision</span>
        </h3>
        <div className="metrics-table__summary">
          <span>Total: {data.length} records</span>
          <span>Total Value: {formatCurrency(totalRevenue, 4)}</span>
          <span>Average: {formatCurrency(averageTransaction, 4)}</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('customer_name')} className="sortable">
                Customer {getSortIcon('customer_name')}
              </th>
              <th onClick={() => handleSort('customer_email')} className="sortable">
                Email {getSortIcon('customer_email')}
              </th>
              <th onClick={() => handleSort('amount')} className="sortable text-right">
                Amount (4 decimals) {getSortIcon('amount')}
              </th>
              <th onClick={() => handleSort('category')} className="sortable">
                Category {getSortIcon('category')}
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {getSortIcon('status')}
              </th>
              <th onClick={() => handleSort('created_at')} className="sortable">
                Date {getSortIcon('created_at')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr 
                key={item.id || index} 
                onClick={() => onRowClick && onRowClick(item)}
                className={onRowClick ? 'clickable' : ''}
              >
                <td className="customer-cell">
                  <div className="customer-avatar">
                    {item.customer_name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="customer-name">{item.customer_name}</div>
                    {item.description && (
                      <div className="customer-description">{item.description}</div>
                    )}
                  </div>
                </td>
                <td className="email-cell">{item.customer_email}</td>
                <td className="amount-cell text-right">
                  <div className="amount-main">{formatCurrency(item.amount, 4)}</div>
                  <div className="amount-decimal">({parseFloat(item.amount || 0).toFixed(4)})</div>
                </td>
                <td>
                  <span className={`badge ${getCategoryBadgeClass(item.category)}`}>
                    {item.category}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="date-cell">
                  {format(new Date(item.created_at), 'MMM dd, yyyy')}
                  <div className="date-time">
                    {format(new Date(item.created_at), 'hh:mm a')}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="table-footer">
              <td colSpan="2" className="footer-label"><strong>Grand Total:</strong></td>
              <td className="footer-amount">
                <strong>{formatCurrency(totalRevenue, 4)}</strong>
                <div className="amount-decimal">({totalRevenue.toFixed(4)} raw)</div>
              </td>
              <td colSpan="3"></td>
            </tr>
            <tr className="table-footer-secondary">
              <td colSpan="2" className="footer-label">Average Transaction:</td>
              <td className="footer-amount">{formatCurrency(averageTransaction, 4)}</td>
              <td colSpan="3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MetricsTable;