// src/components/forms/LoginForm.jsx
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";

function LoginForm({ initialValues, onSubmit }) {
  const LoginSchema = Yup.object().shape({
    nombre_usuario: Yup.string().required("Campo requerido"),
    contrasena: Yup.string().required("Campo requerido"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FormikForm>
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
            variant="main"
            type="submit"
            disabled={isSubmitting}
            className="w-100"
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}

export default LoginForm;
