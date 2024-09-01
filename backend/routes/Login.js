const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");
const SECRET_KEY = process.env.SECRET_KEY;

// REGISTER
router.post("/register", async (req, res) => {
  const { nombre, nombre_usuario, correo, contrasena, celular, rol } = req.body;

  try {
    // Verificar si el correo ya existe
    const correoExistente = await Usuario.findOne({ where: { correo } });
    if (correoExistente) {
      return res.status(422).json({ error: "Correo ya registrado" });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { nombre_usuario },
    });
    if (usuarioExistente) {
      return res.status(422).json({ error: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 8);

    const nuevoUsuario = await Usuario.create({
      nombre,
      nombre_usuario,
      correo,
      contrasena: hashedPassword,
      celular,
      rol,
      activo: true,
      usuario_creacion: nombre_usuario,
    });

    res.status(201).json({
      message: "Usuario registrado con éxito!",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al registrar el usuario", message: error });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    // Buscar al usuario por nombre de usuario
    const usuario = await Usuario.findOne({ where: { nombre_usuario } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Contraseña incorrecta", message: error });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token no válido", message: err });
  }
};

// Ruta protegida
router.get("/ruta-protegida", authenticateJWT, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id_usuario);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ usuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al acceder a la ruta protegida", message: error });
  }
});

module.exports = router;
