import React from "react";
import { Col, Container, Row } from "react-bootstrap"; // Usa los componentes necesarios de react-bootstrap
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/auth/LoginForm";
import AuthService from "../services/auth.service";
import { showErrorAlert } from "../utils/alert";
import { showToast } from "../utils/toast";

function Login() {
  const navigate = useNavigate();

  const loginForm = {
    nombre_usuario: "",
    contrasena: "",
  };

  const handleLogin = (data) => {
    AuthService.login(data.nombre_usuario, data.contrasena).then(
      () => {
        showToast("Inicio de sesión exitoso", "success");
        navigate("/profile");
      },
      (error) => {
        showErrorAlert(
          "Error",
          error.response?.data?.error || "Error al iniciar sesión"
        );
      }
    );
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          <LoginForm initialValues={loginForm} onSubmit={handleLogin} />
          <p className="mt-3">
            ¿No estás registrado? <Link to="/signup">Regístrate ahora</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
