import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../services/api/authService.js';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole?.toUpperCase())) {
    // Redirect to appropriate dashboard if role doesn't match
    switch (userRole?.toUpperCase()) {
      case 'ADMIN':
        return <Navigate to="/admin-dashboard" replace />;
      case 'STUDENT':
        return <Navigate to="/student-dashboard" replace />;
      case 'FACULTY':
        return <Navigate to="/faculty-dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
