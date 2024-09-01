import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    nombre_usuario: "",
    contrasena: "",
  });

  const [loginMessage, setLoginMessage] = useState("");
  const [protectedMessage, setProtectedMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}:3001/auth/login`,
        loginData
      );
      setLoginMessage(
        response.data.token ? "Login exitoso" : response.data.error
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      setLoginMessage(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  const accessProtectedRoute = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_URL}:3001/auth/ruta-protegida`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProtectedMessage(response.data.message || "Acceso exitoso");
    } catch (error) {
      setProtectedMessage(
        error.response?.data?.error || "Error al acceder a la ruta protegida"
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Login</h2>
        <input
          type="text"
          name="nombre_usuario"
          placeholder="Nombre de Usuario"
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={handleLoginChange}
        />
        <button onClick={login}>Iniciar Sesión</button>
        <div className="message">{loginMessage}</div>
      </div>

      <div className="container">
        <h2>Ruta Protegida</h2>
        <button onClick={accessProtectedRoute}>Acceder</button>
        <div className="message">{protectedMessage}</div>
      </div>
    </div>
  );
}

export default Login;
