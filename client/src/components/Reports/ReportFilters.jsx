import React from 'react';
import './Reports.css';

const ReportFilters = ({ filters, setFilters, onApply }) => {
  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply all filters
  const handleApplyFilters = () => {
    if (onApply) {
      onApply(filters);
    }
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    const defaultFilters = {
      startDate: '',
      endDate: '',
      category: 'all',
      status: 'all',
      search: '',
      minAmount: '',
      maxAmount: '',
    };
    setFilters(defaultFilters);
    if (onApply) {
      onApply(defaultFilters);
    }
  };

  return (
    <div className="report-filters">
      <div className="report-filters__header">
        <h3 className="report-filters__title">
          <svg className="report-filters__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M6 12h12M10 18h4" />
          </svg>
          Filters
        </h3>
        <div className="report-filters__actions">
          <button onClick={handleResetFilters} className="btn btn--secondary">
            Reset
          </button>
          <button onClick={handleApplyFilters} className="btn btn--primary">
            Apply Filters
          </button>
        </div>
      </div>

      <div className="report-filters__grid">
        {/* Date Range */}
        <div className="filter-field">
          <label className="filter-field__label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="filter-field__input"
            placeholder="Select start date"
          />
        </div>

        <div className="filter-field">
          <label className="filter-field__label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="filter-field__input"
            placeholder="Select end date"
          />
        </div>

        {/* Category Filter */}
        <div className="filter-field">
          <label className="filter-field__label">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="filter-field__select"
          >
            <option value="all">All Categories</option>
            <option value="saas">SaaS</option>
            <option value="support">Support</option>
            <option value="consulting">Consulting</option>
            <option value="api">API</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-field">
          <label className="filter-field__label">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="filter-field__select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Search Field */}
        <div className="filter-field filter-field--full">
          <label className="filter-field__label">Search</label>
          <div className="filter-field__search">
            <svg className="filter-field__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              name="search"
              value={filters.search || ''}
              onChange={handleChange}
              className="filter-field__input"
              placeholder="Search by customer name or email..."
            />
          </div>
        </div>

        {/* Amount Range */}
        <div className="filter-field">
          <label className="filter-field__label">Min Amount</label>
          <input
            type="number"
            name="minAmount"
            value={filters.minAmount || ''}
            onChange={handleChange}
            className="filter-field__input"
            placeholder="$0"
            step="100"
          />
        </div>

        <div className="filter-field">
          <label className="filter-field__label">Max Amount</label>
          <input
            type="number"
            name="maxAmount"
            value={filters.maxAmount || ''}
            onChange={handleChange}
            className="filter-field__input"
            placeholder="$10,000"
            step="100"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {Object.keys(filters).some(key => filters[key] && filters[key] !== 'all' && filters[key] !== '') && (
        <div className="report-filters__active">
          <span className="active-filters__label">Active filters:</span>
          <div className="active-filters__list">
            {filters.startDate && (
              <span className="active-filter">
                Start: {new Date(filters.startDate).toLocaleDateString()}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, startDate: '' }))}
                  className="active-filter__remove"
                >
                  ×
                </button>
              </span>
            )}
            {filters.endDate && (
              <span className="active-filter">
                End: {new Date(filters.endDate).toLocaleDateString()}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, endDate: '' }))}
                  className="active-filter__remove"
                >
                  ×
                </button>
              </span>
            )}
            {filters.category && filters.category !== 'all' && (
              <span className="active-filter">
                Category: {filters.category}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                  className="active-filter__remove"
                >
                  ×
                </button>
              </span>
            )}
            {filters.status && filters.status !== 'all' && (
              <span className="active-filter">
                Status: {filters.status}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
                  className="active-filter__remove"
                >
                  ×
                </button>
              </span>
            )}
            {filters.search && (
              <span className="active-filter">
                Search: {filters.search}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="active-filter__remove"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;