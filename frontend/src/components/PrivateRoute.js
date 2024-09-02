import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";
import { Roles } from "../utils/global";

const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.rol;

  const allowedRoles = [...roles, Roles.ADMIN];

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default PrivateRoute;
