import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { role } = useAuthStore();

  return role === 'admin' ? element : <Navigate to="/login" />;
};

export default PrivateRoute;