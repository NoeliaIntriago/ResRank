import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import NotAuthorized from "../../features/auth/pages/NotAuthorized";
import { Roles } from "../utils/global";

const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.rol;
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos

    // Verifica si el token ha expirado
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token"); // Elimina el token expirado
      return <Navigate to="/" />;
    }

    // Agregar el rol de ADMIN como rol permitido adicionalmente
    const allowedRoles = [...roles, Roles.ADMIN];

    if (!allowedRoles.includes(userRole)) {
      return <NotAuthorized />; // Mostrar pantalla de "No Autorizado"
    }

    return children;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
