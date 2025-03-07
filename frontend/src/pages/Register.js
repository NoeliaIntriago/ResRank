import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"; // Importa componentes de react-bootstrap
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
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

  const RegisterSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo requerido"),
    nombre_usuario: Yup.string().min(3).max(15).required("Campo requerido"),
    correo: Yup.string().email("Correo inválido").required("Campo requerido"),
    contrasena: Yup.string().min(6).max(16).required("Campo requerido"),
    celular: Yup.string().max(10).required("Campo requerido"),
    rol: Yup.mixed()
      .oneOf(Object.values(Roles), "Rol inválido")
      .required("Campo requerido"),
    matricula: Yup.string().when("rol", {
      is: Roles.ESTUDIANTE,
      then: (schema) => schema.required("Campo requerido"),
    }),
  });

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
          <Formik
            initialValues={registerForm}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              handleRegister(values);
            }}
          >
            {({ values }) => (
              <FormikForm>
                <Form.Group className="mb-3" controlId="inputNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Field
                    name="nombre"
                    as={Form.Control}
                    type="text"
                    placeholder="Nombre"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputNombreUsuario">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Field
                    name="nombre_usuario"
                    as={Form.Control}
                    type="text"
                    placeholder="Nombre de Usuario"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="nombre_usuario"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputCorreo">
                  <Form.Label>Correo</Form.Label>
                  <Field
                    name="correo"
                    as={Form.Control}
                    type="email"
                    placeholder="Correo"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="correo"
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
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="contrasena"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputCelular">
                  <Form.Label>Celular</Form.Label>
                  <Field
                    name="celular"
                    as={Form.Control}
                    type="text"
                    placeholder="Celular"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="celular"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="selectRol">
                  <Form.Label>Rol</Form.Label>
                  <Field name="rol" as="select" className="form-control">
                    <option value={Roles.ADMIN}>Administrador</option>
                    <option value={Roles.DUENO}>Dueño Restaurante</option>
                    <option value={Roles.ESTUDIANTE}>Estudiante</option>
                  </Field>
                  <ErrorMessage
                    name="rol"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                {/* Mostrar campo de matrícula solo si el rol es "estudiante" */}
                {values.rol === Roles.ESTUDIANTE && (
                  <Form.Group className="mb-3" controlId="inputMatricula">
                    <Form.Label>Matrícula</Form.Label>
                    <Field
                      name="matricula"
                      as={Form.Control}
                      type="text"
                      placeholder="Matrícula"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="matricula"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                )}

                <Button variant="primary" type="submit" className="w-100">
                  Registrarse
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
