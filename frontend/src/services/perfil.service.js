import axios from "axios";
import { API_ROUTES } from "./api.routes";
import authHeader from "./auth-header";

const updateInformacion = (id, data, usuario_modificacion) => {
  return axios.patch(`${API_ROUTES.PERFIL}/informacion-general/${id}`, data, {
    headers: {
      ...authHeader(),
      usuario_modificacion,
    },
  });
};

const updatePassword = (id, data, usuario_modificacion) => {
  return axios.patch(`${API_ROUTES.PERFIL}/contrasena/${id}`, data, {
    headers: {
      ...authHeader(),
      usuario_modificacion,
    },
  });
};

const perfilService = {
  updateInformacion,
  updatePassword,
};

export default perfilService;
