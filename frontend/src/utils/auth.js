import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserRole = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.rol;
  }
  return null;
};

export const getUserName = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.nombre_usuario || null;
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const hasRole = (roles) => {
  const userRole = getUserRole();
  return roles.includes(userRole);
};
