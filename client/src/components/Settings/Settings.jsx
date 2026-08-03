import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    autoRefresh: true,
    twoFactorAuth: false,
    language: 'en',
    timezone: 'UTC',
  });
  
  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    toast.success(`${key} ${!settings[key] ? 'enabled' : 'disabled'}`);
  };
  
  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="settings-container"
    >
      <div className="settings-header">
        <h1 className="settings-title">⚙️ Workspace Settings</h1>
      </div>
      
      <div className="settings-sections">
        {/* Profile Section */}
        <div className="settings-card">
          <h3 className="settings-card-title">👤 Profile Information</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>Username</label>
              <input type="text" defaultValue={user?.username} className="settings-input" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={user?.email} className="settings-input" />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input type="text" placeholder="Enter company name" className="settings-input" />
            </div>
          </div>
        </div>
        
        {/* Appearance Section */}
        <div className="settings-card">
          <h3 className="settings-card-title">🎨 Appearance</h3>
          <div className="settings-option">
            <div className="option-info">
              <div className="option-title">Dark Mode</div>
              <div className="option-description">Switch between light and dark theme</div>
            </div>
            <button onClick={toggleDarkMode} className={`toggle-switch ${darkMode ? 'active' : ''}`}>
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>
        
        {/* Notifications Section */}
        <div className="settings-card">
          <h3 className="settings-card-title">🔔 Notifications</h3>
          <div className="settings-option">
            <div className="option-info">
              <div className="option-title">Email Notifications</div>
              <div className="option-description">Receive updates via email</div>
            </div>
            <button 
              onClick={() => handleToggle('emailNotifications')} 
              className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
          
          <div className="settings-option">
            <div className="option-info">
              <div className="option-title">Push Notifications</div>
              <div className="option-description">Real-time browser notifications</div>
            </div>
            <button 
              onClick={() => handleToggle('pushNotifications')} 
              className={`toggle-switch ${settings.pushNotifications ? 'active' : ''}`}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>
        
        {/* Security Section */}
        <div className="settings-card">
          <h3 className="settings-card-title">🔒 Security</h3>
          <div className="settings-option">
            <div className="option-info">
              <div className="option-title">Two-Factor Authentication</div>
              <div className="option-description">Add an extra layer of security</div>
            </div>
            <button 
              onClick={() => handleToggle('twoFactorAuth')} 
              className={`toggle-switch ${settings.twoFactorAuth ? 'active' : ''}`}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
          
          <div className="settings-option">
            <div className="option-info">
              <div className="option-title">Change Password</div>
              <div className="option-description">Update your password</div>
            </div>
            <button className="secondary-btn">Change</button>
          </div>
        </div>
        
        {/* Data Management */}
        <div className="settings-card">
          <h3 className="settings-card-title">📊 Data Management</h3>
          <div className="settings-option">
            <div className="option-info">
              <div className="option-title">Auto-refresh Dashboard</div>
              <div className="option-description">Automatically update dashboard data</div>
            </div>
            <button 
              onClick={() => handleToggle('autoRefresh')} 
              className={`toggle-switch ${settings.autoRefresh ? 'active' : ''}`}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
          
          <div className="settings-option">
            <div className="option-info">
              <div className="option-title">Export All Data</div>
              <div className="option-description">Download your analytics data</div>
            </div>
            <button className="secondary-btn">Export</button>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="settings-actions">
          <button onClick={handleSave} className="save-btn">
            💾 Save All Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;