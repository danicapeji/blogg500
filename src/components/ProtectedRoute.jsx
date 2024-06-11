import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../firebase";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
