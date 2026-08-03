import React from 'react';
import { motion } from 'framer-motion';
import './Dashboard.css';

const KPICard = ({ title, value, trend, icon, color }) => {
  const isPositive = trend >= 0;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="kpi-card"
      style={{ borderTopColor: color }}
    >
      <div className="kpi-header">
        <span className="kpi-icon">{icon}</span>
        <h3 className="kpi-title">{title}</h3>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-trend ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(trend)}% vs last month
      </div>
    </motion.div>
  );
};

export default KPICard;