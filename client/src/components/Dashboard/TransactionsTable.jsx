import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { dashboardService } from '../../services/dashboardService';
import './Dashboard.css';

const TransactionsTable = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => dashboardService.getTransactions({ limit: 10 }),
  });
  
  if (isLoading) {
    return <div className="loading">Loading transactions...</div>;
  }
  
  const transactionList = transactions?.data?.results || [];
  
  return (
    <div>
      <h3 className="chart-title">🕒 Recent Transactions</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.customer_name}</td>
              <td>{format(new Date(tx.created_at), 'MMM dd, yyyy')}</td>
              <td>${tx.amount?.toLocaleString()}</td>
              <td>
                <span className={`status-badge status-${tx.status}`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;