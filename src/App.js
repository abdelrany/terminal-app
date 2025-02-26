import React, { useState } from "react";
import { AppRouter } from './router';
import { setAuthToken } from './services/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  return (
    <div className="app">
      <AppRouter 
        isAuthenticated={isAuthenticated} 
        onLogin={handleLogin}
      />
    </div>
  );
}
