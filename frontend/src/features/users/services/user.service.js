import { API_ROUTES } from "../../../shared/routes/api.routes";
import axios from "../../../shared/utils/axios";
import authHeader from "../../auth/services/auth-header";

const getAll = () => {
  return axios.get(`${API_ROUTES.USUARIO}`, { headers: authHeader() });
};

const getById = (id) => {
  return axios.get(`${API_ROUTES.USUARIO}/${id}`, { headers: authHeader() });
};

const create = (data, usuario_creacion) => {
  return axios.post(`${API_ROUTES.USUARIO}`, data, {
    headers: {
      ...authHeader(),
      usuario_creacion,
    },
  });
};

const update = (id, data, usuario_modificacion) => {
  return axios.put(`${API_ROUTES.USUARIO}/${id}`, data, {
    headers: {
      ...authHeader(),
      usuario_modificacion,
    },
  });
};

const toggleStatus = (id, activo, usuario_modificacion) => {
  return axios.put(
    `${API_ROUTES.USUARIO}/${id}`,
    { activo },
    {
      headers: {
        ...authHeader(),
        usuario_modificacion,
      },
    }
  );
};

const userService = {
  getAll,
  getById,
  create,
  update,
  toggleStatus,
};

export default userService;
