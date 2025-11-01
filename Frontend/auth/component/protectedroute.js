import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Atau spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;