import axios from "axios";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik"; // Asegúrate de usar FormikForm
import { jwtDecode } from "jwt-decode"; // Corrige la importación de jwtDecode
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"; // Usa los componentes necesarios de react-bootstrap
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { showErrorAlert } from "../utils/alert";
import { Roles } from "../utils/global";
import { showToast } from "../utils/toast";

function Login() {
  const navigate = useNavigate();

  const loginForm = {
    nombre_usuario: "",
    contrasena: "",
  };

  const LoginSchema = Yup.object().shape({
    nombre_usuario: Yup.string().required("Campo requerido"),
    contrasena: Yup.string().required("Campo requerido"),
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}:3001/auth/login`,
        data
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const { rol } = decodedToken;

      showToast("Inicio de sesión exitoso", "success");

      // Redirigir según el rol del usuario
      switch (rol) {
        case Roles.ADMIN:
        case Roles.DUENO:
          navigate("/dashboard");
          break;
        case Roles.ESTUDIANTE:
          navigate("/restaurants");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Error capturado:", error);

      // Verifica si hay respuesta desde el servidor
      const errorMessage =
        error.response?.data?.error || "Error al iniciar sesión";
      showErrorAlert("Error", errorMessage);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          <Formik
            initialValues={loginForm}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await handleLogin(values);
              setSubmitting(false); // Asegúrate de deshabilitar la opción de "submit" al finalizar
            }}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                {" "}
                {/* Usamos FormikForm aquí para asegurar que el envío del formulario se maneje correctamente */}
                <Form.Group className="mb-3" controlId="inputNombreUsuario">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Field
                    name="nombre_usuario"
                    as={Form.Control}
                    type="text"
                    placeholder="Nombre de Usuario"
                  />
                  <ErrorMessage
                    name="nombre_usuario"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputContrasena">
                  <Form.Label>Contraseña</Form.Label>
                  <Field
                    name="contrasena"
                    as={Form.Control}
                    type="password"
                    placeholder="Contraseña"
                  />
                  <ErrorMessage
                    name="contrasena"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  {isSubmitting ? "Ingresando..." : "Ingresar"}
                </Button>
              </FormikForm>
            )}
          </Formik>

          <p className="mt-3">
            ¿No estás registrado? <Link to="/register">Regístrate ahora</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
