import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiHome, FiBarChart2, FiActivity, FiSettings, FiLogOut, 
  FiTrendingUp, FiUsers 
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/reports', icon: <FiBarChart2 />, label: 'Reports' },
    { path: '/insights', icon: <FiActivity />, label: 'Live Pulse' },
    { path: '/settings', icon: <FiSettings />, label: 'Settings' },
  ];
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="sidebar">
      <div className="logo-section">
        <h2 className="logo">🌸 Analytix</h2>
        <p className="logo-subtitle">Business Intelligence</p>
      </div>
      
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;