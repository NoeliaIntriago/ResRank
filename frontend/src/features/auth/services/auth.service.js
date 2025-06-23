import axios from "axios";
import { API_ROUTES } from "../../../shared/routes/api.routes";

const register = (payload) => {
  return axios.post(API_ROUTES.AUTH.SIGNUP, {
    ...payload,
  });
};

const login = (username, password) => {
  return axios
    .post(API_ROUTES.AUTH.LOGIN, {
      nombre_usuario: username,
      contrasena: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
