import { Col, Container, Row } from "react-bootstrap"; // Importa componentes de react-bootstrap
import { useNavigate } from "react-router-dom";
import { showErrorAlert } from "../../../shared/utils/alert";
import { Roles } from "../../../shared/utils/global";
import { showToast } from "../../../shared/utils/toast";
import AuthService from "../../auth/services/auth.service";
import RegisterForm from "../components/RegisterForm";

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
