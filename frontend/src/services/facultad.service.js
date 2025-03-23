import axios from "axios";
import { API_ROUTES } from "./api.routes";
import authHeader from "./auth-header";

const getAll = () => {
  return axios.get(API_ROUTES.FACULTAD, {
    headers: authHeader(),
  });
};

const getById = (id) => {
  return axios.get(`${API_ROUTES.FACULTAD}/${id}`, {
    headers: authHeader(),
  });
};

const create = (data, usuario_creacion) => {
  return axios.post(API_ROUTES.FACULTAD, data, {
    headers: {
      ...authHeader(),
      usuario_creacion,
    },
  });
};

const update = (id, data, usuario_modificacion) => {
  return axios.put(`${API_ROUTES.FACULTAD}/${id}`, data, {
    headers: {
      ...authHeader(),
      usuario_modificacion,
    },
  });
};

const toggleStatus = (id, activo, usuario_modificacion) => {
  return axios.put(
    `${API_ROUTES.FACULTAD}/${id}`,
    { activo },
    {
      headers: {
        ...authHeader(),
        usuario_modificacion,
      },
    }
  );
};

const facultadService = {
  getAll,
  getById,
  create,
  update,
  toggleStatus,
};

export default facultadService;
