const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id_usuario;
    next();
  });
};

isAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    if (user.rol === "admin") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  });
};

isEstudiante = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    if (user.rol === "estudiante") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Estudiante Role!",
    });
    return;
  });
};

isOwner = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    if (user.rol === "dueno_restaurante") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Owner Role!",
    });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isEstudiante: isEstudiante,
  isOwner: isOwner,
};
module.exports = authJwt;
