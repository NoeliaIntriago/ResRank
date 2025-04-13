// routes/Usuario.js

const express = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/Usuario.controller");

const router = express.Router();

// Middleware for setting CORS headers
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Define routes with middleware for JWT authentication
router.get("/", [authJwt.verifyToken], controller.getAllUsuarios);
router.get("/:id_usuario", [authJwt.verifyToken], controller.getUsuarioById);
router.post("/", [authJwt.verifyToken], controller.createUsuario);
router.put("/:id", [authJwt.verifyToken], controller.updateUsuario);

module.exports = router;
