import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { Authcontex } from './AuthContext';


const PrivetsRoutes = ({ children }) => {
  const { user,loading } = useContext(Authcontex); 
  const location = useLocation();
//ata diye loadin set kora hoy jathe bar bar login a niye na jay start
if(loading){
  return <span className="loading loading-bars loading-xl"></span>
}
//ata diye loadin set kora hoy jathe bar bar login a niye na jay start

//ta diye privet routs nevigate korte hoy
  if (!user) {
    return <Navigate to="/sign" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetsRoutes;
