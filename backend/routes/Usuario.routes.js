// routes/Usuario.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const UsuarioController = require("../controllers/Usuario.controller");

router.get("/", UsuarioController.getAllUsuarios);
router.post("/", UsuarioController.createUsuario);
router.put("/:id_usuario", verifyToken, UsuarioController.updateUsuario);

module.exports = router;
