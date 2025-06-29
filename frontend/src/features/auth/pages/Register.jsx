import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showAlert, showErrorAlert } from "../../../shared/utils/alert";
import { Roles } from "../../../shared/utils/global";
import { handleApiError } from "../../../shared/utils/handleApiError";
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

  const handleRegister = async (data) => {
    try {
      showAlert(
        "Registrando usuario",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

      await AuthService.register(data);
      showToast("Registro exitoso", "success");
      navigate("/");
    } catch (error) {
      console.error("Error mostrando alerta:", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
      return;
    }
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
