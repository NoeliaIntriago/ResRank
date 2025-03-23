import React from "react";
import { Col, Container, Row } from "react-bootstrap"; // Importa componentes de react-bootstrap
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/auth/RegisterForm";
import AuthService from "../services/auth.service";
import { showErrorAlert } from "../utils/alert";
import { Roles } from "../utils/global";
import { showToast } from "../utils/toast";

function Register() {
  const navigate = useNavigate();

  const registerForm = {
    nombre: "",
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    celular: "",
    rol: Roles.ADMIN,
    matricula: "",
  };

  const handleRegister = (data) => {
    AuthService.register(data).then(
      () => {
        showToast("Registro exitoso", "success");
        navigate("/");
      },
      (error) => {
        console.error(error);
        showErrorAlert(
          "Error",
          error.response?.data?.error || "Error al registrar usuario"
        );
      }
    );
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Registro</h2>
          <RegisterForm
            initialValues={registerForm}
            onSubmit={handleRegister}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
