// controllers/Auth.controller.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");
const SECRET_KEY = process.env.SECRET_KEY;

exports.signup = async (req, res) => {
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

    const hashedPassword = await bcrypt.hashSync(contrasena, 8);

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
};

exports.signin = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombre_usuario } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const isMatch = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!isMatch) {
      return res
        .status(401)
        .json({ accessToken: null, message: "Contraseña incorrecta" });
    }

    // Crear el token JWT
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        rol: usuario.rol,
      },
      SECRET_KEY,
      {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: "8h",
      }
    );

    res.status(200).json({
      id_usuario: usuario.id_usuario,
      nombre_usuario: usuario.nombre_usuario,
      correo: usuario.correo,
      rol: usuario.rol,
      accessToken: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.authenticateJWT = (req, res, next) => {
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

exports.protectedRoute = async (req, res) => {
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
};
