import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useNavigation } from '../../hooks/useNavigation';
import { sendResetPasswordOTP, resetPassword } from '../../services/api';

export const ForgotPassword = () => {
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: phone input, 2: OTP + new password

  const elements = step === 1 
    ? ['phone', 'submit'] 
    : ['otp', 'password', 'reset'];
  const selectedIndex = useNavigation(elements);

  const handleSendOTP = async () => {
    try {
      await sendResetPasswordOTP(phone);
      setStep(2);
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please check your phone number.');
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(phone, otp, newPassword);
      history.push('/agent');
    } catch (err) {
      setError('Failed to reset password. Please check your OTP.');
    }
  };

  if (step === 1) {
    return (
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          nav-index="0"
          nav-selectable="true"
          className={selectedIndex === 0 ? 'selected' : ''}
        />
        <button
          onClick={handleSendOTP}
          nav-index="1"
          nav-selectable="true"
          className={selectedIndex === 1 ? 'selected' : ''}
        >
          Send OTP
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <h2>Enter OTP & New Password</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        nav-index="0"
        nav-selectable="true"
        className={selectedIndex === 0 ? 'selected' : ''}
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        nav-index="1"
        nav-selectable="true"
        className={selectedIndex === 1 ? 'selected' : ''}
      />
      <button
        onClick={handleResetPassword}
        nav-index="2"
        nav-selectable="true"
        className={selectedIndex === 2 ? 'selected' : ''}
      >
        Reset Password
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}; 