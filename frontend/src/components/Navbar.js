import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { getUserRole } from "../utils/auth"; // Importamos la función para obtener el rol del usuario
import { Roles } from "../utils/global";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Decidir si se muestra el Navbar o no
  const shouldShowNavbar = !["/", "/register"].includes(location.pathname);

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/");
  };

  // Obtener el rol del usuario
  const userRole = getUserRole();

  return (
    shouldShowNavbar && (
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/home" className="nav-logo">
            ResRank
          </Link>
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/restaurant">Restaurant</Link>

            {/* Mostrar link para dashboard solo si el usuario es dueño o admin */}
            {(userRole === Roles.DUENO || userRole === Roles.ADMIN) && (
              <Link to="/dashboard">Dashboard</Link>
            )}

            {/* Botón de Cerrar sesión */}
            <button onClick={handleLogout} className="nav-logout">
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
    )
  );
}

export default Navbar;
