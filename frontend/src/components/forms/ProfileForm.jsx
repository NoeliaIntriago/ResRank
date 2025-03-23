// src/components/forms/ProfileForm.jsx
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";

function ProfileForm({ initialValues, onSubmit }) {
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo requerido"),
    nombre_usuario: Yup.string().min(3).max(15).required("Campo requerido"),
    correo: Yup.string().email("Correo inválido").required("Campo requerido"),
    contrasena: Yup.string().min(6, "Mínimo 6 caracteres").max(16),
    celular: Yup.string()
      .max(10, "Máximo 10 dígitos")
      .required("Campo requerido"),
    matricula: Yup.string(), // Solo se muestra si el usuario es estudiante
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values }) => (
        <FormikForm>
          <Row>
            <Col md={6}>
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
            </Col>

            <Col md={6}>
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
            </Col>
          </Row>

          <Row>
            <Col md={6}>
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
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="inputContrasena">
                <Form.Label>Nueva Contraseña (opcional)</Form.Label>
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
            </Col>
          </Row>

          <Row>
            <Col md={6}>
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
            </Col>

            {values.rol === "estudiante" && (
              <Col md={6}>
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
              </Col>
            )}
          </Row>

          <Button type="submit" variant="primary">
            Guardar Cambios
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}

export default ProfileForm;
