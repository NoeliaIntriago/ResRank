const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token" });
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

    // Guardar el usuario en req.user
    req.user = decoded;

    next(); // Continuar con la ejecución de la ruta
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = verifyToken;
