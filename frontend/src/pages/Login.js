import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik"; // Asegúrate de usar FormikForm
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"; // Usa los componentes necesarios de react-bootstrap
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { showErrorAlert } from "../utils/alert";
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
          <Formik
            initialValues={loginForm}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              handleLogin(values);
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
            ¿No estás registrado? <Link to="/signup">Regístrate ahora</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
