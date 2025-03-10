import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import UsuarioForm from "../components/forms/UsuarioForm";
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import { Roles } from "../utils/global";

function Profile() {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);

  const [usuario, setUsuario] = useState({
    id_usuario: null,
    nombre: "",
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    celular: "",
    rol: Roles.ADMIN,
    matricula: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const { data: response } = await axios.get(
        `${process.env.REACT_APP_URL}:3001/api/usuario/${currentUser.id_usuario}`,
        {
          headers: authHeader(),
        }
      );
      setUsuario({
        id_usuario: response.id_usuario,
        nombre: response.nombre,
        nombre_usuario: response.nombre_usuario,
        correo: response.correo,
        contrasena: "",
        celular: response.celular,
        rol: response.rol,
        matricula: response.estudiante?.matricula || "",
      });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }, [currentUser.id_usuario]);

  useEffect(() => {
    fetchData(); // Llamamos a la función asíncrona
  }, [fetchData]);

  return (
    <div className="App">
      <div className="app-container">
        <h1>Perfil</h1>
        <p>
          <strong>Nombre:</strong> {usuario.nombre}
        </p>
        <UsuarioForm
          key={usuario.id_usuario}
          initialValues={usuario}
          onSubmit={() => {}}
        />
      </div>
    </div>
  );
}

export default Profile;
