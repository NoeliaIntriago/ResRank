import { API_ROUTES } from "../../../shared/routes/api.routes";
import axios from "../../../shared/utils/axios";

const register = (payload) => {
  return axios.post(API_ROUTES.AUTH.SIGNUP, {
    ...payload,
  });
};

const login = async (username, password) => {
  const response = await axios.post(API_ROUTES.AUTH.LOGIN, {
    nombre_usuario: username,
    contrasena: password,
  });

  const { data } = response.data;
  console.log("Login response:", data);
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.usuario));
  }
  return data;
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
