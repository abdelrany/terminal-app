import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';

export const Home = () => {
  const history = useHistory();
  const elements = ['payment', 'history', 'logout'];
  const selectedIndex = useNavigation(elements);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/agent');
  };

  return (
    <div className="home-container">
      <h2>Welcome Agent</h2>
      <div className="menu-items">
        <button
          nav-index="0"
          nav-selectable="true"
          className={selectedIndex === 0 ? 'selected' : ''}
          onClick={() => history.push('/agent/payment')}
        >
          Process Payment
        </button>
        <button
          nav-index="1"
          nav-selectable="true"
          className={selectedIndex === 1 ? 'selected' : ''}
          onClick={() => history.push('/agent/history')}
        >
          Transaction History
        </button>
        <button
          nav-index="2"
          nav-selectable="true"
          className={selectedIndex === 2 ? 'selected' : ''}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}; 