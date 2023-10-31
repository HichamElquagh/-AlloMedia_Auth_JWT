import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // Check user role and render content accordingly
  const userRole = user.role;

  if (userRole === "livreur" || userRole === "admin" || userRole === "client") {
    // If user has allowed role, render the protected content
    return <Outlet />;
  }

  // If user role is not allowed, redirect to login
};

export default PrivateRoute;
