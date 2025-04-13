import React, { useCallback, useEffect, useState } from "react";
import ProfileTabs from "../components/tabs/ProfileTabs";
import AuthService from "../services/auth.service";
import userService from "../services/user.service";
import { Roles } from "../utils/global";

function Profile() {
  const currentUser = AuthService.getCurrentUser();

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
      const { data: response } = await userService.getById(
        currentUser.id_usuario
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
        <ProfileTabs
          initialProfile={usuario}
          onSubmitProfile={(data) => console.log("Actualizar perfil:", data)}
          onSubmitPassword={(data) => console.log("Cambiar contraseña:", data)}
        />
      </div>
    </div>
  );
}

export default Profile;
