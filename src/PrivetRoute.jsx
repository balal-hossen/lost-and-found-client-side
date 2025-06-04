// PrivateRoute.jsx
import { useContext } from "react";

import { useLocation } from "react-router";
import { Authcontex } from "./AuthContext";


const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontex);
  const location = useLocation();

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRoute;
