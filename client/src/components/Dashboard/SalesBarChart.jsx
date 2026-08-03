import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesBarChart = () => {
  const data = {
    labels: ['SaaS', 'Support', 'Consulting', 'API'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [62300, 35400, 21200, 10800],
        backgroundColor: ['#ec4899', '#f472b6', '#f43f5e', '#db2777'],
        borderRadius: 8,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  
  return (
    <div className="chart-container">
      <h3 className="chart-title">📊 Sales by Category</h3>
      <Bar data={data} options={options} height={250} />
    </div>
  );
};

export default SalesBarChart;