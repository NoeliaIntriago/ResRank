import { Button, Col, Container, Row } from "react-bootstrap"; // Importa los componentes de react-bootstrap
import { useNavigate } from "react-router-dom";
import { Roles } from "../../../shared/utils/global";
import AuthService from "../services/auth.service";
import "../styles/NotAuthorized.css"; // Archivo de estilos CSS para personalizar

const NotAuthorized = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const handleRedirect = () => {
    const userRole = currentUser?.rol;

    switch (userRole) {
      case Roles.ADMIN:
      case Roles.DUENO:
        navigate("/restaurant-management");
        break;
      case Roles.ESTUDIANTE:
        navigate("/restaurants");
        break;
      default:
        navigate("/home");
        break;
    }
  };

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="no-autorizado-title">403 - No Autorizado</h1>
          <p className="no-autorizado-message">
            Lo sentimos, no tienes acceso para ver esta página.
          </p>
          <Button variant="main" onClick={handleRedirect}>
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotAuthorized;
