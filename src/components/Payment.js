import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useNavigation } from '../hooks/useNavigation';
import { initiatePayment, getPaymentStatus } from '../services/api';

export const Payment = () => {
  const [amount, setAmount] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const elements = ['amount', 'process'];
  const selectedIndex = useNavigation(elements);

  const handlePayment = async () => {
    try {
      const response = await initiatePayment(amount);
      setPaymentId(response.data.paymentId);
      setQrData(response.data.qrCode);
      // Start polling payment status
      checkPaymentStatus(response.data.paymentId);
    } catch (err) {
      setError('Failed to initiate payment');
    }
  };

  const checkPaymentStatus = async (id) => {
    try {
      const response = await getPaymentStatus(id);
      setStatus(response.data.status);
      if (response.data.status === 'pending') {
        setTimeout(() => checkPaymentStatus(id), 5000); // Poll every 5 seconds
      }
    } catch (err) {
      setError('Failed to check payment status');
    }
  };

  return (
    <div className="payment-container">
      <h2>Process Payment</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        nav-index="0"
        nav-selectable="true"
        className={selectedIndex === 0 ? 'selected' : ''}
      />
      <button
        onClick={handlePayment}
        nav-index="1"
        nav-selectable="true"
        className={selectedIndex === 1 ? 'selected' : ''}
      >
        Process Payment
      </button>
      {qrData && (
        <div className="qr-container">
          <QRCode value={qrData} />
          <p>Status: {status}</p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}; 