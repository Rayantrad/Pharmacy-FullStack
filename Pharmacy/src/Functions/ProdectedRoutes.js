import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Contexts/UserContext";

function ProtectedRoutes({ children, role }) {
  const { isAuth, user } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoutes;