import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "../styles/Register.module.css";
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

      showToast(response.message, "success");

      switch (rol) {
        case Roles.ADMIN:
          navigate("/home");
          break;
        case Roles.DUENO:
          navigate("/");
          break;
        case Roles.ESTUDIANTE:
          navigate("/");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Error capturado:", error);
      console.error("Response:", error.response);
      showErrorAlert(
        "Error",
        error.response?.data?.error || "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Login</h2>
        <Formik
          initialValues={loginForm}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            await handleLogin(values);
          }}
        >
          <Form className={styles.formContainer}>
            <label>Nombre de Usuario:</label>
            <Field
              id="inputNombreUsuario"
              type="text"
              name="nombre_usuario"
              placeholder="Nombre de Usuario"
            />
            <ErrorMessage name="nombre_usuario" component="span" />

            <label>Contraseña:</label>
            <Field
              id="inputContrasena"
              type="password"
              name="contrasena"
              placeholder="Contraseña"
            />
            <ErrorMessage name="contrasena" component="span" />

            <button type="submit">Ingresar</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
