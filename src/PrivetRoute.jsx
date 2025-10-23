import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Authcontex } from '../AuthContext';

const PrivetsRoutes = ({ children }) => {
  const { user, loading } = useContext(Authcontex);
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // loading state
  }

  if (!user) {
    return <Navigate to={`/sign?redirect=${location.pathname}`} replace />;
  }

  return children;
};

export default PrivetsRoutes;
