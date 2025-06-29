// src/utils/axios.js
import axios from "axios";
import AuthService from "../../features/auth/services/auth.service";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;

    if (status === 401 || code === "AUTH_TOKEN_INVALID") {
      AuthService.logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
