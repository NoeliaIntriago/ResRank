const MESSAGES = require("./response/messages");

exports.successResponse = (res, code, data = null, status = 200) => {
  return res.status(status).json({
    success: true,
    code,
    message: MESSAGES[code] || "Operación exitosa",
    ...(data !== null && { data }),
  });
};

exports.errorResponse = (res, code, details = null, status = 500) => {
  return res.status(status).json({
    success: false,
    code,
    message: MESSAGES[code] || "Ocurrió un error",
    error: {
      ...(details && { details }),
    },
  });
};
