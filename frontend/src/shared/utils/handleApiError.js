// src/utils/handleApiError.js

export function handleApiError(error) {
  const code = error?.response?.data?.code;
  const message =
    error?.response?.data?.message || "Ocurrió un error inesperado";

  return {
    title: "Error",
    message,
    code,
  };
}
