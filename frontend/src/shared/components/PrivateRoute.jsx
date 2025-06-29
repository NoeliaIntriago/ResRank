import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import NotAuthorized from "../../features/auth/pages/NotAuthorized";
import { Roles } from "../utils/global";
import { showToast } from "../utils/toast";

const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.rol;
    const currentTime = Date.now() / 1000;

    // 🔐 Token expirado
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showToast(
        "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
        "error"
      );
      return <Navigate to="/login" replace />;
    }

    // ✅ Admin puede acceder a todo
    const allowedRoles = [...roles, Roles.ADMIN];

    if (roles.length > 0 && !allowedRoles.includes(userRole)) {
      return <NotAuthorized />;
    }

    return children;
  } catch (error) {
    console.error("Token inválido o malformado:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    showToast("Sesión inválida. Por favor, vuelve a iniciar sesión.", "error");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
