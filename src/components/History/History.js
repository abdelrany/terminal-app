import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { getTransactionHistory } from '../../services/api';
import css from './History.module.css';
import { Header } from '../Header/Header';

export const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const elements = ['startDate', 'endDate', 'filter'];
  const selectedIndex = useNavigation(elements);

  const loadTransactions = async () => {
    try {
      const response = await getTransactionHistory(startDate, endDate);
      setTransactions(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load transactions');
    }
  };

  useEffect(() => {
    // Load initial transactions for last 7 days
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      loadTransactions();
    }
  }, [startDate, endDate]);

  return (
    <div className={css.historyContainer}>
      <Header title="Transaction History"/>
      <div className={css.filters}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          nav-index="0"
          nav-selectable="true"
          className={selectedIndex === 0 ? css.selected : ''}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          nav-index="1"
          nav-selectable="true"
          className={selectedIndex === 1 ? css.selected : ''}
        />
        <button
          onClick={loadTransactions}
          nav-index="2"
          nav-selectable="true"
          className={selectedIndex === 2 ? css.selected : ''}
        >
          Filter
        </button>
      </div>

      {error && <div className={css.error}>{error}</div>}

      <div className={css.transactionList}>
        {transactions.map((transaction, index) => (
          <div key={transaction.id || index} className={css.transaction}>
            <div className={css.amount}>{transaction.amount}</div>
            <div className={css.date}>{new Date(transaction.date).toLocaleDateString()}</div>
            <div className={css.status}>{transaction.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 