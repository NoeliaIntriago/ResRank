const BASE_URL = `${import.meta.env.VITE_APP_URL}:3001/api`;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/signin`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    USER: `${BASE_URL}/auth/user`,
    ADMIN: `${BASE_URL}/auth/admin`,
    MOD: `${BASE_URL}/auth/mod`,
    PUBLIC: `${BASE_URL}/auth/all`,
  },
  USUARIO: `${BASE_URL}/usuario`,
  BAR: `${BASE_URL}/bar`,
  FACULTAD: `${BASE_URL}/facultad`,
  PERFIL: `${BASE_URL}/perfil`,
  REVIEWS: `${BASE_URL}/review`,
};
