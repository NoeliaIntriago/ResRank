const { Usuario } = require("../models");
const logger = require("../services/logger");
const ROLES = ["estudiante", "dueno_restaurante", "admin"];

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Usuario.findOne({
    where: {
      nombre_usuario: req.body.nombre_usuario,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!",
        });
        return;
      }

      // Email
      Usuario.findOne({
        where: {
          correo: req.body.correo,
        },
      }).then((user) => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!",
          });
          return;
        }

        next();
      });
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
