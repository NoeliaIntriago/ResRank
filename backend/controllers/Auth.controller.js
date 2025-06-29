// controllers/Auth.controller.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");
const logger = require("../services/logger");
const { errorResponse, successResponse } = require("./utils/response");
const CODE = require("./utils/response/codes");
const SECRET_KEY = process.env.SECRET_KEY;

exports.signup = async (req, res) => {
  const { nombre, nombre_usuario, correo, contrasena, celular, rol } = req.body;

  try {
    // Verificar si el correo ya existe
    const correoExistente = await Usuario.findOne({ where: { correo } });
    if (correoExistente) {
      return errorResponse(res, CODE.REGISTER.EMAIL_EXISTS, null, 422);
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { nombre_usuario },
    });
    if (usuarioExistente) {
      return errorResponse(res, CODE.REGISTER.USERNAME_EXISTS, null, 422);
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

    successResponse(res, CODE.REGISTER.SUCCESS, nuevoUsuario, 201);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.signin = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombre_usuario } });

    if (!usuario) {
      return errorResponse(res, CODE.AUTH.USER_NOT_FOUND, null, 404);
    }

    // Verificar la contraseña
    const isMatch = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!isMatch) {
      return errorResponse(res, CODE.AUTH.INVALID_PASSWORD, null, 401);
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

    return successResponse(res, CODE.AUTH.SUCCESS, { token, usuario }, 200);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return errorResponse(
      res,
      CODE.AUTH.TOKEN_INVALID,
      "Token no proporcionado",
      401
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(err);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};
