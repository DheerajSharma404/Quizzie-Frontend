/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to='/sign-up' />;
};

export default ProtectedRoute;
