import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // Bulletproof fallback: check localStorage directly in case context state has rendering lag
  const currentUser = user || (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  // if (!currentUser) {
  //   return <Navigate to="/login" replace />;
  // }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Graceful routing: redirect the user to their respective dashboard instead of a blank or generic page
    if (currentUser.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    } else if (currentUser.role === "RECEPTIONIST") {
      return <Navigate to="/reception" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;