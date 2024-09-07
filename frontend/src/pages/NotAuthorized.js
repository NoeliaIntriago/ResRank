import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotAuthorized.css"; // Archivo de estilos CSS para personalizar
import { getUserRole } from "../utils/auth";
import { Roles } from "../utils/global";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const userRole = getUserRole();

    switch (userRole) {
      case Roles.ADMIN:
      case Roles.DUENO:
        navigate("/dashboard");
        break;
      case "ESTUDIANTE":
        navigate("/restaurants");
        break;
      default:
        navigate("/home");
        break;
    }
  };

  return (
    <div className="no-autorizado-container">
      <h1 className="no-autorizado-title">403 - No Autorizado</h1>
      <p className="no-autorizado-message">
        Lo sentimos, no tienes acceso para ver esta página.
      </p>
      <button className="no-autorizado-button" onClick={() => handleRedirect}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default NotAuthorized;
