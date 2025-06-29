import { API_ROUTES } from "../../../shared/routes/api.routes";
import axios from "../../../shared/utils/axios";
import authHeader from "../../auth/services/auth-header";

const getAll = (filters = {}) => {
  return axios.get(API_ROUTES.REVIEWS, {
    params: filters,
    headers: authHeader(),
  });
};

const create = (opinion, usuario_creacion) => {
  console.log("usuario_creacion", usuario_creacion);
  return axios.post(API_ROUTES.REVIEWS, opinion, {
    headers: {
      ...authHeader(),
      usuario_creacion,
    },
  });
};

const opinionService = {
  getAll,
  create,
};

export default opinionService;
