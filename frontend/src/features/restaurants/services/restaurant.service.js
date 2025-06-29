import { API_ROUTES } from "../../../shared/routes/api.routes";
import axios from "../../../shared/utils/axios";
import authHeader from "../../auth/services/auth-header";

const getAll = (filters = {}) => {
  return axios.get(API_ROUTES.BAR, {
    params: filters,
    headers: authHeader(),
  });
};

const getById = (id) => {
  return axios.get(`${API_ROUTES.BAR}/${id}`, {
    headers: authHeader(),
  });
};

const create = (data, usuario_creacion) => {
  return axios.post(API_ROUTES.BAR, data, {
    headers: {
      ...authHeader(),
      usuario_creacion,
    },
  });
};

const update = (id, data, usuario_modificacion) => {
  return axios.put(`${API_ROUTES.BAR}/${id}`, data, {
    headers: {
      ...authHeader(),
      usuario_modificacion,
    },
  });
};

const changeStatus = (id, activo, usuario_modificacion) => {
  return axios.put(
    `${API_ROUTES.BAR}/${id}/change-status`,
    { activo },
    {
      headers: {
        ...authHeader(),
        usuario_modificacion,
      },
    }
  );
};

const restaurantService = {
  getAll,
  getById,
  create,
  update,
  changeStatus,
};

export default restaurantService;
