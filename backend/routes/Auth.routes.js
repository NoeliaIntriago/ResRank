// routes/Auth.js

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller");

// REGISTER
router.post("/signup", AuthController.signup);

// LOGIN
router.post("/signin", AuthController.signin);

// Ruta protegida
router.get(
  "/ruta-protegida",
  AuthController.authenticateJWT,
  AuthController.protectedRoute
);

module.exports = router;
