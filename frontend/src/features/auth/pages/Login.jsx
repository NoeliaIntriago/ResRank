import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { showAlert, showErrorAlert } from "../../../shared/utils/alert";
import { handleApiError } from "../../../shared/utils/handleApiError";
import { showToast } from "../../../shared/utils/toast";
import LoginForm from "../components/LoginForm";
import AuthService from "../services/auth.service";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = AuthService.getToken();

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          navigate("/profile", { replace: true });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Token malformado:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const loginForm = {
    nombre_usuario: "",
    contrasena: "",
  };

  const handleLogin = async (data) => {
    try {
      const alert = showAlert(
        "Iniciando sesión",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

      await AuthService.login(data.nombre_usuario, data.contrasena);
      showToast("Inicio de sesión exitoso", "success");
      navigate("/profile");

      alert.close();
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
