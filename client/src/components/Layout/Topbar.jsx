import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Topbar.css';

const Topbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="topbar">
      <div className="search-section">
        <FiSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search transactions, reports..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="topbar-actions">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '🌙' : '☀️'}
        </button>
        <button className="notification-btn">
          <FiBell />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <FiUser />
          </div>
          <span className="user-name">{user?.username || 'User'}</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;