import React from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";
import { Navigate, Outlet } from "react-router-dom";

// 1. Accept allowedRoles as a prop (default to an empty array)
const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div><Loader /></div>;
  }

  // 2. Not logged in? Kick to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. THE NEW RBAC CHECK:
  // If this route requires specific roles, and the user's role is NOT in the list...
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Kick them to an unauthorized page (or back to the dashboard)
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. They are logged in AND have the right role! Let them in.
  return <Outlet />;
};

export default ProtectedRoutes;