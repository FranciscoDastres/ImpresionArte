// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || (requiredRole && user.rol !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}