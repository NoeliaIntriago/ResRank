import { useCallback, useEffect, useState } from "react";
import { showAlert, showErrorAlert } from "../../../shared/utils/alert";
import { Roles } from "../../../shared/utils/global";
import { handleApiError } from "../../../shared/utils/handleApiError";
import AuthService from "../../auth/services/auth.service";
import userService from "../../users/services/user.service";
import ProfileTabs from "../components/ProfileTabs";
import perfilService from "../services/perfil.service";

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
      const alert = showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

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

      alert.close();
    } catch (error) {
      console.error("Error al cargar datos:", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
    }
  }, [currentUser.id_usuario]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleProfileUpdate = async (data) => {
    try {
      showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

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

      await showAlert("Éxito", "Perfil actualizado con éxito", "success");

      fetchData();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
    }
  };

  const handlePasswordUpdate = async (data) => {
    try {
      showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

      const { contrasena_actual, contrasena_nueva } = data;
      await perfilService.updatePassword(
        currentUser.id_usuario,
        {
          contrasena_actual,
          contrasena_nueva,
        },
        currentUser.id_usuario
      );

      await showAlert("Éxito", "Contraseña actualizada con éxito", "success");

      setUsuario((prevState) => ({
        ...prevState,
        contrasena: "",
      }));
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
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
