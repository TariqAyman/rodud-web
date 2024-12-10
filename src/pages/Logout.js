import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/apiService';
import { getToken } from '../utils/authUtils';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const data = await logout('/logout');
      localStorage.removeItem('Authorization');

      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <div>Logging out...</div>;
};

export default Logout;
