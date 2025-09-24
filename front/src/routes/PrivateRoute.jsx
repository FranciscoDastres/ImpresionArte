// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children, requiredRole }) {
  const { user, isAuthenticated, isAdmin, isClient } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole === "admin" && !isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole === "cliente" && !isClient()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}