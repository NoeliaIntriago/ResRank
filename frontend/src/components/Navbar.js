import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserName, getUserRole } from "../utils/auth"; // Supongamos que también tenemos una función getUserName
import { Roles } from "../utils/global";

function CustomNavbar() {
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

  // Obtener el rol y el nombre del usuario
  const userRole = getUserRole();
  const userName = getUserName(); // Supongamos que esta función devuelve el nombre de usuario

  return (
    shouldShowNavbar && (
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            ResRank
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/restaurants">
                Restaurantes
              </Nav.Link>

              {userRole === Roles.ESTUDIANTE && (
                <Nav.Link as={Link} to="/locations">
                  Ubicaciones
                </Nav.Link>
              )}

              {(userRole === Roles.DUENO || userRole === Roles.ADMIN) && (
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              )}

              {userRole === Roles.ADMIN && (
                <Nav.Link as={Link} to="/users">
                  Usuarios
                </Nav.Link>
              )}

              <Nav.Link as={Link} to="/profile">
                Perfil
              </Nav.Link>
            </Nav>

            {/* Mostrar el nombre de usuario si está disponible */}
            {userName && (
              <Navbar.Text className="me-3">Bienvenido, {userName}</Navbar.Text>
            )}

            <Button
              variant="outline-light"
              onClick={handleLogout}
              className="custom-nav-logout"
            >
              Cerrar sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
}

export default CustomNavbar;
