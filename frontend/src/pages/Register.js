import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { showAlert, showErrorAlert } from "../utils/alert";
import { showToast } from "../utils/toast";
import { Roles } from "../utils/global";
import styles from "../styles/Register.module.css";

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

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}:3001/auth/register`,
        data
      );

      showToast(response.message, "success");
      const result = await showAlert("Registro Exitoso!", response.message);
      if (result.isConfirmed) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error capturado:", error);
      console.error("Response:", error.response);

      showToast("Error al registrar", "error");
      showErrorAlert(
        "Error",
        error.response?.data?.error || "Error al registrar"
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Registro</h2>
        <Formik
          initialValues={registerForm}
          validationSchema={RegisterSchema}
          onSubmit={async (values) => {
            await handleRegister(values);
          }}
        >
          {({ values }) => (
            <Form className={styles.formContainer}>
              <label>Nombre:</label>
              <Field
                id="inputNombre"
                type="text"
                name="nombre"
                placeholder="Nombre"
              />
              <ErrorMessage name="nombre" component="span" />

              <label>Nombre de Usuario:</label>
              <Field
                id="inputNombreUsuario"
                type="text"
                name="nombre_usuario"
                placeholder="Nombre de Usuario"
              />
              <ErrorMessage name="nombre_usuario" component="span" />

              <label>Correo:</label>
              <Field
                id="inputCorreo"
                type="email"
                name="correo"
                placeholder="Correo"
              />
              <ErrorMessage name="correo" component="span" />

              <label>Contraseña:</label>
              <Field
                id="inputContrasena"
                type="password"
                name="contrasena"
                placeholder="Contraseña"
              />
              <ErrorMessage name="contrasena" component="span" />

              <label>Celular:</label>
              <Field
                id="inputCelular"
                type="text"
                name="celular"
                placeholder="Celular"
              />
              <ErrorMessage name="celular" component="span" />

              <label>Rol:</label>
              <Field id="selectRol" name="rol" component="select">
                <option value={Roles.ADMIN}>Administrador</option>
                <option value={Roles.DUENO}>Dueño Restaurante</option>
                <option value={Roles.ESTUDIANTE}>Estudiante</option>
              </Field>
              <ErrorMessage name="rol" component="span" />

              {/* Mostrar campo de matrícula solo si el rol es "estudiante" */}
              {values.rol === Roles.ESTUDIANTE && (
                <>
                  <label>Matrícula:</label>
                  <Field
                    id="inputMatricula"
                    type="text"
                    name="matricula"
                    placeholder="Matrícula"
                  />
                  <ErrorMessage name="matricula" component="span" />
                </>
              )}
              <button type="submit">Registrarse</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
