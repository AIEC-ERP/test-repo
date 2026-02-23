import React from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";
import { Navigate,Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div><Loader/></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
