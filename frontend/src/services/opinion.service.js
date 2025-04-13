import axios from "axios";
import { API_ROUTES } from "./api.routes";
import authHeader from "./auth-header";

const getAll = (filters = {}) => {
  return axios.get(API_ROUTES.REVIEWS, {
    params: filters,
    headers: authHeader(),
  });
};

const opinionService = {
  getAll,
};

export default opinionService;
