import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const FacultyRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return user?.role === "FACULTY" ? children : <Navigate to="/login" />;
};

export default FacultyRoute;
