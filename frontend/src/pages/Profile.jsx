import React, { useCallback, useEffect, useState } from "react";
import ProfileTabs from "../components/tabs/ProfileTabs";
import AuthService from "../services/auth.service";
import perfilService from "../services/perfil.service";
import userService from "../services/user.service";
import { showAlert, showErrorAlert } from "../utils/alert";
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

  const handleProfileUpdate = async (data) => {
    try {
      const { nombre, nombre_usuario, correo, celular } = data;
      await perfilService.updateInformacion(
        currentUser.id_usuario,
        {
          nombre,
          nombre_usuario,
          correo,
          celular,
        },
        currentUser.id_usuario
      );

      showAlert("Éxito", "Perfil actualizado con éxito", "success");

      // Refrescar los datos del usuario después de la actualización
      fetchData();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      showErrorAlert(
        "Error",
        error.response?.data?.message || "Error al actualizar el perfil"
      );
    }
  };

  const handlePasswordUpdate = async (data) => {
    try {
      const { contrasena_actual, contrasena_nueva } = data;
      await perfilService.updatePassword(
        currentUser.id_usuario,
        {
          contrasena_actual,
          contrasena_nueva,
        },
        currentUser.id_usuario
      );

      showAlert("Éxito", "Contraseña actualizada con éxito", "success");

      // lIMPIAR CAMPOS
      setUsuario((prevState) => ({
        ...prevState,
        contrasena: "",
      }));
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      showErrorAlert(
        "Error",
        error.response?.data?.message || "Error al actualizar la contraseña"
      );
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1>Perfil</h1>
        <ProfileTabs
          initialProfile={usuario}
          onSubmitProfile={(data) => handleProfileUpdate(data)}
          onSubmitPassword={(data) => handlePasswordUpdate(data)}
        />
      </div>
    </div>
  );
}

export default Profile;
