import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserPieChart = () => {
  const data = {
    labels: ['Free Users', 'Premium Users'],
    datasets: [
      {
        data: [19800, 15200],
        backgroundColor: ['#fbcfe8', '#ec4899'],
        borderWidth: 0,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  
  return (
    <div className="chart-container">
      <h3 className="chart-title">👥 User Distribution</h3>
      <Pie data={data} options={options} height={250} />
    </div>
  );
};

export default UserPieChart;