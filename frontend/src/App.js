import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [registerData, setRegisterData] = useState({
    nombre: "",
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    celular: "",
  });

  const [loginData, setLoginData] = useState({
    nombre_usuario: "",
    contrasena: "",
  });

  const [registerMessage, setRegisterMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [protectedMessage, setProtectedMessage] = useState("");

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}:3001/auth/register`,
        {
          ...registerData,
          rol: "estudiante",
        }
      );
      setRegisterMessage(response.data.message || "Registro exitoso");
    } catch (error) {
      console.error(error);
      setRegisterMessage(error.response?.data?.error || "Error al registrar");
    }
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
        <h2>Registro</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleRegisterChange}
        />
        <input
          type="text"
          name="nombre_usuario"
          placeholder="Nombre de Usuario"
          onChange={handleRegisterChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={handleRegisterChange}
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={handleRegisterChange}
        />
        <input
          type="text"
          name="celular"
          placeholder="Celular"
          onChange={handleRegisterChange}
        />
        <button onClick={register}>Registrarse</button>
        <div className="message">{registerMessage}</div>
      </div>

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

export default App;
