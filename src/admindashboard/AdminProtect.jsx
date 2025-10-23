import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

const AdminProtect = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  // ✅ Admin check by email
  const isAdmin = user.email === "admin@lostfound.com";

  if (!isAdmin) return <p>Access Denied! You are not an admin.</p>;

  return children;
};

export default AdminProtect;
