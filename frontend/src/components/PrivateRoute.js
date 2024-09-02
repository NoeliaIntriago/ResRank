import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { Roles } from "../utils/global";

const PrivateRoute = ({ element: Component, roles = [], ...rest }) => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const allowedRoles = roles.push(Roles.ADMIN);

  return (
    <Route
      {...rest}
      render={(props) =>
        token && allowedRoles.includes(user.rol) ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
