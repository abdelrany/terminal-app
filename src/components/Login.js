import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import { login } from '../services/api';
import { Header } from './Header/Header';
import { setAuthData } from '../utils/auth';

export const Login = ({ onLogin }) => {
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const elements = ['phone', 'password', 'login', 'forgot'];
  const selectedIndex = useNavigation(elements);

  const handlePhoneChange = (e) => {
    // Remove any non-digit characters including '+'
    const formattedPhone = e.target.value.replace(/\D/g, '');
    setPhone(formattedPhone);
  };

  const handleLogin = async () => {
    try {
      const response = await login(phone, password);
      if (response.data.data) {
        setAuthData(response.data.data);
        onLogin(response.data.data.token);
        history.push('/agent/home');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <Header title="Agent Login"/>
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        nav-index="0"
        nav-selectable="true"
        className={selectedIndex === 0 ? 'selected' : ''}
        placeholder="Phone Number (without +)"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        nav-index="1"
        nav-selectable="true"
        className={selectedIndex === 1 ? 'selected' : ''}
        placeholder="Password"
      />
      <button
        onClick={handleLogin}
        nav-index="2"
        nav-selectable="true"
        className={selectedIndex === 2 ? 'selected' : ''}
      >
        Login
      </button>
      <Link
        to="/agent/forgot-password"
        nav-index="3"
        nav-selectable="true"
        className={selectedIndex === 3 ? 'selected' : ''}
      >
        Forgot Password?
      </Link>
      {error && <div className="error">{error}</div>}
    </div>
  );
}; 