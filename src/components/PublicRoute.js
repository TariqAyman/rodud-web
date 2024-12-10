import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ element }) => {
  const { user } = useAuth();

  return !user ? element : <Navigate to="/dashboard" />;
};

export default PublicRoute;
