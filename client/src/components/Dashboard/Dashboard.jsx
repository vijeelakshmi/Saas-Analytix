import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import KPICard from './KPICard';
import RevenueChart from './RevenueChart';
import SalesBarChart from './SalesBarChart';
import UserPieChart from './UserPieChart';
import TransactionsTable from './TransactionsTable';
import { dashboardService } from '../../services/dashboardService';
import './Dashboard.css';

const Dashboard = () => {
  const { data: kpiData, isLoading } = useQuery({
    queryKey: ['kpiData'],
    queryFn: () => dashboardService.getKPIData(),
    refetchInterval: 30000,
  });
  
  const { data: revenueData } = useQuery({
    queryKey: ['revenueTrend'],
    queryFn: () => dashboardService.getRevenueTrend(),
  });
  
  const kpis = kpiData?.data || {
    total_revenue: 0,
    total_users: 0,
    mrr: 0,
    growth_rate: 0,
    churn_rate: 0,
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard"
    >
      <div className="kpi-grid">
        <KPICard 
          title="Total Revenue" 
          value={`$${kpis.total_revenue?.toLocaleString()}`} 
          trend={kpis.growth_rate}
          icon="💰"
          color="#ec4899"
        />
        <KPICard 
          title="Active Users" 
          value={kpis.total_users?.toLocaleString()} 
          trend={12.5}
          icon="👥"
          color="#8b5cf6"
        />
        <KPICard 
          title="Monthly Revenue" 
          value={`$${kpis.mrr?.toLocaleString()}`} 
          trend={10.2}
          icon="💎"
          color="#f43f5e"
        />
        <KPICard 
          title="Growth Rate" 
          value={`${kpis.growth_rate}%`} 
          trend={kpis.growth_rate}
          icon="📈"
          color="#10b981"
        />
      </div>
      
      <div className="charts-section">
        <RevenueChart data={revenueData?.data || []} />
      </div>
      
      <div className="charts-grid">
        <SalesBarChart />
        <UserPieChart />
      </div>
      
      <div className="transactions-section">
        <TransactionsTable />
      </div>
    </motion.div>
  );
};

export default Dashboard;