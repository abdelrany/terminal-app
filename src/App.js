import React, { useState, useEffect } from "react";
import { AppRouter } from './router';
import { setAuthToken } from './services/api';
import { getAuthData } from './utils/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authData = getAuthData();
    if (authData.token) {
      setAuthToken(authData.token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
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
