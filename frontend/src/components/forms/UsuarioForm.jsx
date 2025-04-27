import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Col, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Roles } from "../../utils/global";

const UserSchema = Yup.object().shape({
  nombre: Yup.string().required("Campo requerido"),
  nombre_usuario: Yup.string().min(3).max(15).required("Campo requerido"),
  correo: Yup.string().email("Correo inválido").required("Campo requerido"),
  celular: Yup.string().max(10).required("Campo requerido"),
  rol: Yup.mixed()
    .oneOf(Object.values(Roles), "Rol inválido")
    .required("Campo requerido"),
  matricula: Yup.string().when("rol", {
    is: Roles.ESTUDIANTE,
    then: (schema) => schema.required("Campo requerido"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

function UsuarioForm({ initialValues, onSubmit, innerRef }) {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={UserSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="formNombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Field
              name="nombre"
              as={Form.Control}
              type="text"
              placeholder="Nombre"
              autoComplete="off"
              isInvalid={!!ErrorMessage.nombre}
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formNombreUsuario" className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Field
              name="nombre_usuario"
              as={Form.Control}
              type="text"
              placeholder="Nombre de Usuario"
              autoComplete="off"
              isInvalid={!!ErrorMessage.nombre_usuario}
            />
            <ErrorMessage
              name="nombre_usuario"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formCorreo" className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Field
              name="correo"
              as={Form.Control}
              type="email"
              placeholder="Correo"
              autoComplete="off"
              isInvalid={!!ErrorMessage.correo}
            />
            <ErrorMessage
              name="correo"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          {/* Contraseña opcional */}
          <Form.Group as={Col} controlId="formContrasena" className="mb-3">
            <Form.Label>Nueva Contraseña (opcional)</Form.Label>
            <Field
              name="contrasena"
              as={Form.Control}
              type="password"
              placeholder="Dejar en blanco para no cambiar"
              autoComplete="off"
              isInvalid={!!ErrorMessage.contrasena}
            />
            <ErrorMessage
              name="contrasena"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formCelular" className="mb-3">
            <Form.Label>Celular</Form.Label>
            <Field
              name="celular"
              as={Form.Control}
              type="text"
              placeholder="Celular"
              autoComplete="off"
              isInvalid={!!ErrorMessage.celular}
            />
            <ErrorMessage
              name="celular"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formRol" className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Field name="rol" as="select" className="form-control">
              <option value={Roles.ADMIN}>Administrador</option>
              <option value={Roles.DUENO}>Dueño Restaurante</option>
              <option value={Roles.ESTUDIANTE}>Estudiante</option>
            </Field>
            <ErrorMessage name="rol" component="div" className="text-danger" />
          </Form.Group>

          {/* Mostrar campo de matrícula solo si el rol es "estudiante" */}
          {values.rol === Roles.ESTUDIANTE && (
            <Form.Group as={Col} controlId="formMatricula" className="mb-3">
              <Form.Label>Matrícula</Form.Label>
              <Field
                name="matricula"
                as={Form.Control}
                type="text"
                placeholder="Matrícula"
                autoComplete="off"
                isInvalid={!!ErrorMessage.matricula}
              />
              <ErrorMessage
                name="matricula"
                component="div"
                className="text-danger"
              />
            </Form.Group>
          )}
        </FormikForm>
      )}
    </Formik>
  );
}

export default UsuarioForm;
