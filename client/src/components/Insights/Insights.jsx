import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LivePulseChart from './LivePulseChart';
import { useWebSocket } from '../../hooks/useWebSocket';
import './Insights.css';

const Insights = () => {
  const [liveData, setLiveData] = useState({
    activeSessions: 1420,
    apiCalls: 892,
    responseTime: 245,
    errorRate: 0.8,
  });
  
  const { lastMessage, sendMessage } = useWebSocket('ws://localhost:8000/ws/insights/');
  
  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage);
        setLiveData(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    }
  }, [lastMessage]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setLiveData(prev => ({
        activeSessions: Math.floor(Math.random() * 500 + 1200),
        apiCalls: Math.floor(Math.random() * 400 + 700),
        responseTime: Math.floor(Math.random() * 100 + 200),
        errorRate: Math.random() * 2,
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="insights-container"
    >
      <div className="insights-header">
        <h1 className="insights-title">⚡ Live Pulse Dashboard</h1>
        <div className="live-indicator">
          <span className="pulse-dot"></span>
          Live Updates
        </div>
      </div>
      
      <div className="live-metrics-grid">
        <div className="live-metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-info">
            <div className="metric-label">Active Sessions</div>
            <div className="metric-value">{liveData.activeSessions}</div>
          </div>
        </div>
        
        <div className="live-metric-card">
          <div className="metric-icon">📡</div>
          <div className="metric-info">
            <div className="metric-label">API Calls/min</div>
            <div className="metric-value">{liveData.apiCalls}</div>
          </div>
        </div>
        
        <div className="live-metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-info">
            <div className="metric-label">Response Time (ms)</div>
            <div className="metric-value">{liveData.responseTime}</div>
          </div>
        </div>
        
        <div className="live-metric-card">
          <div className="metric-icon">⚠️</div>
          <div className="metric-info">
            <div className="metric-label">Error Rate</div>
            <div className="metric-value">{liveData.errorRate.toFixed(2)}%</div>
          </div>
        </div>
      </div>
      
      <div className="live-chart-section">
        <LivePulseChart liveData={liveData} />
      </div>
      
      <div className="event-feed">
        <h3 className="feed-title">🔔 Live Event Feed</h3>
        <div className="feed-items">
          <div className="feed-item">
            <span className="feed-time">{new Date().toLocaleTimeString()}</span>
            <span className="feed-message">New user registered from USA</span>
          </div>
          <div className="feed-item">
            <span className="feed-time">{new Date().toLocaleTimeString()}</span>
            <span className="feed-message">API call volume increased by 15%</span>
          </div>
          <div className="feed-item">
            <span className="feed-time">{new Date().toLocaleTimeString()}</span>
            <span className="feed-message">Peak traffic detected</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;