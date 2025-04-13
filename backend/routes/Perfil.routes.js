// routes/Perfil.js

const express = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/Perfil.controller");

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
router.patch(
  "/informacion-general/:id",
  [authJwt.verifyToken],
  controller.updateProfile
);
router.patch(
  "/contrasena/:id",
  [authJwt.verifyToken],
  controller.updatePassword
);

module.exports = router;
