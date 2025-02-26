import axios from 'axios';

const BASE_URL = 'https://backend-test.tookeez.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth APIs
export const login = (phoneNumber, password) => {

  return api.post('/login_check', {
    username: phoneNumber,
    password: password,
    profile: "agent",
    version: "2.1.0",
    token: "agent_token_00"
  });
};

export const refreshToken = () => {
  return api.get('/refresh_token');
};

export const sendResetPasswordOTP = (phoneNumber) => {
  return api.post('/sendResetPasswordOtpAgent', {
    phone_number: phoneNumber,
    profile: "agent",
    android: "ios"
  });
};

export const resetPassword = (phoneNumber, otp, newPassword) => {
  return api.post('/reset_password_agent', {
    telephone: phoneNumber,
    codeRecovery: otp,
    password: newPassword,
    profile: "agent"
  });
};

// Payment APIs
export const initiatePayment = (amount) => {
  return api.post('/tkzpayment/initiatePayWithTKZ', {
    amountTotal: amount,
    source: "M0b!le_@pp#2025"
  });
};

export const getPaymentStatus = (paymentId) => {
  return api.get(`/tkzpayment/paymentStatus/${paymentId}`);
};

// Transaction History APIs
export const getTransactionHistory = (startDate, endDate) => {
  return api.post('/tkzpayment/payments', {
    startDate,
    endDate
  });
}; 