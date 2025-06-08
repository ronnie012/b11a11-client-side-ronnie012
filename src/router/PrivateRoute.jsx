import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loading spinner while checking auth status
    return <LoadingSpinner />;
  }

  if (user) {
    // User is logged in, render the protected content
    return children;
  }

  // User is not logged in, redirect to login page
  // Pass current location in state to redirect back after login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;


