// controllers/UsuarioController.js

const bcrypt = require("bcryptjs");
const { Usuario, Estudiante } = require("../models");
const logger = require("../services/logger");
const { errorResponse, successResponse } = require("./utils/response");
const CODE = require("./utils/response/codes");

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Estudiante, as: "estudiante" }],
    });
    res.json(usuarios);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.getUsuarioById = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const usuario = await Usuario.findByPk(id_usuario, {
      include: [{ model: Estudiante, as: "estudiante" }],
    });
    res.json(usuario);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.createUsuario = async (req, res) => {
  const body = req.body;

  try {
    const { usuario_creacion } = req.headers;

    const existingUser = await Usuario.findOne({
      where: { nombre_usuario: body.nombre_usuario },
    });

    if (existingUser) {
      return errorResponse(res, CODE.REGISTER.USERNAME_EXISTS, null, 422);
    }

    const userIsAdmin = await Usuario.findOne({
      where: { nombre_usuario: usuario_creacion, rol: "admin" },
    });

    if (!userIsAdmin && body.rol === "admin") {
      return errorResponse(res, CODE.AUTH.CREATE_ADMIN_FORBIDDEN, null, 403);
    }

    const usuario = await Usuario.create({
      ...body,
      usuario_creacion,
      fecha_creacion: new Date(),
    });

    if (body.rol === "estudiante") {
      await Estudiante.create({
        id_usuario: usuario.id_usuario,
        matricula: body.matricula,
      });
    }

    return successResponse(res, CODE.REGISTER.SUCCESS, usuario, 201);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.updateUsuario = async (req, res) => {
  const params = req.params;
  const body = req.body;
  const { usuario_modificacion } = req.headers;

  try {
    const usuario = await Usuario.findByPk(params.id);

    // Validar que no se esté desactivando a sí mismo
    if (usuario.nombre_usuario === usuario_modificacion && !body.activo) {
      return errorResponse(
        res,
        CODE.AUTH.SELF_DEACTIVATION_FORBIDDEN,
        null,
        403
      );
    }

    const userIsAdmin = await Usuario.findOne({
      where: { nombre_usuario: usuario_modificacion, rol: "admin" },
    });

    if (!userIsAdmin && body.rol === "admin") {
      return errorResponse(res, CODE.AUTH.CREATE_ADMIN_FORBIDDEN, null, 403);
    }

    if (body.contrasena) {
      body.contrasena = await bcrypt.hash(body.contrasena, 8);
    }
    body.usuario_modificacion = usuario_modificacion;
    body.fecha_modificacion = new Date();

    await Usuario.update({ ...body }, { where: { id_usuario: params.id } });

    if (body.rol === "estudiante") {
      await Estudiante.update(
        { matricula: body.matricula },
        { where: { id_usuario: params.id } }
      );
    }

    return successResponse(
      res,
      CODE.REGISTER.SUCCESS,
      { id_usuario: params.id, ...body },
      200
    );
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};
