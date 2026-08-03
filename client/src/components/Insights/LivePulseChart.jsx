import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LivePulseChart = ({ liveData }) => {
  const chartRef = useRef();
  
  const chartData = {
    labels: Array.from({ length: 20 }, (_, i) => `${i * 5}s ago`).reverse(),
    datasets: [
      {
        label: 'Active Sessions',
        data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 500 + 1200)),
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };
  
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const newData = [...chart.data.datasets[0].data.slice(1), liveData.activeSessions];
      chart.data.datasets[0].data = newData;
      chart.update();
    }
  }, [liveData]);
  
  return (
    <div>
      <h3 className="section-title">Real-time Active Sessions</h3>
      <Line ref={chartRef} data={chartData} options={options} height={300} />
    </div>
  );
};

export default LivePulseChart;