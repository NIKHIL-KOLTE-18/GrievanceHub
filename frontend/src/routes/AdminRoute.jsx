import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute; 