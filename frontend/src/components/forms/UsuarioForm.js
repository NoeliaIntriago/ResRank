import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { Roles } from "../../utils/global";

const UserSchema = Yup.object().shape({
  nombre: Yup.string().required("Campo requerido"),
  nombre_usuario: Yup.string().min(3).max(15).required("Campo requerido"),
  correo: Yup.string().email("Correo inválido").required("Campo requerido"),
  contrasena: Yup.string().min(6).required("Campo requerido"),
  celular: Yup.string().max(10).required("Campo requerido"),
  rol: Yup.mixed()
    .oneOf(Object.values(Roles), "Rol inválido")
    .required("Campo requerido"),
  matricula: Yup.string().when("rol", {
    is: Roles.ESTUDIANTE,
    then: (schema) => schema.required("Campo requerido"),
  }),
});

function UsuarioForm({ initialValues, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <Field
              id="inputNombre"
              type="text"
              name="nombre"
              placeholder="Nombre"
              autoComplete="off"
            />
            <ErrorMessage name="nombre" component="span" />
          </div>
          <div className="form-group">
            <label>Nombre de Usuario:</label>
            <Field
              id="inputNombreUsuario"
              type="text"
              name="nombre_usuario"
              placeholder="Nombre de Usuario"
              autoComplete="off"
            />
            <ErrorMessage name="nombre_usuario" component="span" />
          </div>
          <div className="form-group">
            <label>Correo:</label>
            <Field
              id="inputCorreo"
              type="email"
              name="correo"
              placeholder="Correo"
              autoComplete="off"
            />
            <ErrorMessage name="correo" component="span" />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <Field
              id="inputContrasena"
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              autoComplete="off"
            />
            <ErrorMessage name="contrasena" component="span" />
          </div>
          <div className="form-group">
            <label>Celular:</label>
            <Field
              id="inputCelular"
              type="text"
              name="celular"
              placeholder="Celular"
              autoComplete="off"
            />
            <ErrorMessage name="celular" component="span" />
          </div>
          <div className="form-group">
            <label>Rol:</label>
            <Field id="selectRol" name="rol" component="select">
              <option value={Roles.ADMIN}>Administrador</option>
              <option value={Roles.DUENO}>Dueño Restaurante</option>
              <option value={Roles.ESTUDIANTE}>Estudiante</option>
            </Field>
            <ErrorMessage name="rol" component="span" />
          </div>
          {/* Mostrar campo de matrícula solo si el rol es "estudiante" */}
          {values.rol === Roles.ESTUDIANTE && (
            <>
              <div className="form-group">
                <label>Matrícula:</label>
                <Field
                  id="inputMatricula"
                  type="text"
                  name="matricula"
                  placeholder="Matrícula"
                  autoComplete="off"
                />
                <ErrorMessage name="matricula" component="span" />
              </div>
            </>
          )}

          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default UsuarioForm;
