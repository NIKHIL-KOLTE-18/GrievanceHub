import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const StudentRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return user?.role === "STUDENT" ? children : <Navigate to="/login" />;
};

export default StudentRoute;
