import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { dashboardService } from '../../services/dashboardService';
import './Reports.css';

const Reports = () => {
  // State Management
  const [filters, setFilters] = useState({
    startDate: format(new Date().setMonth(new Date().getMonth() - 3), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    category: 'all',
    status: 'all',
  });

  // Data Fetching
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['revenueTrend', filters],
    queryFn: () => dashboardService.getRevenueTrend(),
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => dashboardService.getTransactions(filters),
  });

  // Calculate Summary Statistics with Decimal Precision
  const transactionList = transactions?.data?.results || [];
  
  // Helper function to format currency with 3-4 decimal places
  const formatCurrency = (amount, decimalPlaces = 2) => {
    if (!amount && amount !== 0) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(amount);
  };

  // Helper function to format number with decimal places
  const formatNumber = (number, decimalPlaces = 2) => {
    if (!number && number !== 0) return '0.00';
    return number.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  };

  // Calculate totals with precise decimal handling
  const totalRevenue = transactionList.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  const averageTransaction = transactionList.length > 0 ? totalRevenue / transactionList.length : 0;
  const completedCount = transactionList.filter(t => t.status === 'completed').length;
  const completedRevenue = transactionList
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  
  // Calculate percentage with decimals
  const completionRate = transactionList.length > 0 
    ? (completedCount / transactionList.length) * 100 
    : 0;

  // Export Functionality with precise decimal handling
  const handleExport = () => {
    const csvData = transactionList.map(item => ({
      Customer: item.customer_name,
      Email: item.customer_email,
      Amount: formatCurrency(item.amount, 3),
      'Amount (Raw)': parseFloat(item.amount || 0).toFixed(3),
      Status: item.status,
      Category: item.category,
      Date: format(new Date(item.created_at), 'yyyy-MM-dd'),
      'Time': format(new Date(item.created_at), 'HH:mm:ss'),
    }));

    // Add summary row
    const summaryRow = {
      Customer: 'TOTAL',
      Email: '',
      Amount: formatCurrency(totalRevenue, 3),
      'Amount (Raw)': totalRevenue.toFixed(3),
      Status: '',
      Category: '',
      Date: '',
      'Time': '',
    };

    const headers = Object.keys(csvData[0] || {});
    const csvRows = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(',')),
      '', // Empty row for separation
      `"Summary - Total Revenue","${formatCurrency(totalRevenue, 3)}"`,
      `"Summary - Average Transaction","${formatCurrency(averageTransaction, 3)}"`,
      `"Summary - Completion Rate","${formatNumber(completionRate, 2)}%"`,
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="reports"
    >
      {/* Header Section */}
      <div className="reports__header">
        <div>
          <h1 className="reports__title">Reports & Analytics</h1>
          <p className="reports__subtitle">View and export your business insights with precise decimal accuracy</p>
        </div>
        <button onClick={handleExport} className="btn btn--primary">
          <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0-3-3m3 3 3-3M5 21h14"/>
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filters Section */}
      <div className="reports__filters">
        <div className="filter-group">
          <label className="filter-group__label">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="filter-group__input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-group__label">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="filter-group__input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-group__label">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-group__select"
          >
            <option value="all">All Categories</option>
            <option value="saas">SaaS</option>
            <option value="support">Support</option>
            <option value="consulting">Consulting</option>
            <option value="api">API</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-group__label">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-group__select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards with Decimal Precision */}
      <div className="reports__stats">
        <div className="stat-card">
          <div className="stat-card__icon">💰</div>
          <div className="stat-card__content">
            <div className="stat-card__label">Total Revenue</div>
            <div className="stat-card__value">{formatCurrency(totalRevenue, 3)}</div>
            <div className="stat-card__detail">precise to 3 decimal places</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">📊</div>
          <div className="stat-card__content">
            <div className="stat-card__label">Total Transactions</div>
            <div className="stat-card__value">{transactionList.length}</div>
            <div className="stat-card__detail">{formatNumber(completionRate, 2)}% completion rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">⭐</div>
          <div className="stat-card__content">
            <div className="stat-card__label">Average Transaction</div>
            <div className="stat-card__value">{formatCurrency(averageTransaction, 3)}</div>
            <div className="stat-card__detail">per transaction</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">✅</div>
          <div className="stat-card__content">
            <div className="stat-card__label">Completed Revenue</div>
            <div className="stat-card__value">{formatCurrency(completedRevenue, 3)}</div>
            <div className="stat-card__detail">{completedCount} successful transactions</div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="reports__table-container">
        <div className="table-header">
          <h3 className="table-header__title">Transaction Details</h3>
          <div className="table-header__info">
            Showing {transactionList.length} entries | Total: {formatCurrency(totalRevenue, 3)}
          </div>
        </div>

        {transactionsLoading ? (
          <div className="loading-state">
            <div className="loading-state__spinner"></div>
            <p>Loading transactions...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Amount (4 decimals)</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactionList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="data-table__empty">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactionList.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="data-table__customer">
                        <strong>{transaction.customer_name}</strong>
                       </td>
                      <td>{transaction.customer_email}</td>
                      <td className="data-table__amount">
                        <div className="amount-main">{formatCurrency(transaction.amount, 4)}</div>
                        <div className="amount-decimal">({parseFloat(transaction.amount || 0).toFixed(4)})</div>
                      </td>
                      <td>
                        <span className={`badge badge--${transaction.category}`}>
                          {transaction.category}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge--${transaction.status}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td>{format(new Date(transaction.created_at), 'MMM dd, yyyy')}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {transactionList.length > 0 && (
                <tfoot>
                  <tr className="table-footer">
                    <td colSpan="2" className="footer-label"><strong>Totals:</strong></td>
                    <td className="footer-amount">
                      <strong>{formatCurrency(totalRevenue, 4)}</strong>
                    </td>
                    <td colSpan="3"></td>
                  </tr>
                  <tr className="table-footer-secondary">
                    <td colSpan="2" className="footer-label">Average:</td>
                    <td className="footer-amount">{formatCurrency(averageTransaction, 4)}</td>
                    <td colSpan="3"></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Reports;