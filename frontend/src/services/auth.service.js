import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL}:3001/api/auth/`;

const register = (payload) => {
  return axios.post(API_URL + "signup", {
    ...payload,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
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
