// controllers/Perfil.controller.js

const bcrypt = require("bcryptjs");
const { Usuario, Estudiante } = require("../models");
const logger = require("../services/logger");
const { errorResponse, successResponse } = require("./utils/response");
const CODE = require("./utils/response/codes");

exports.updateProfile = async (req, res) => {
  const params = req.params;
  const body = req.body;

  const { usuario_modificacion } = req.headers;
  try {
    const usuario = await Usuario.findByPk(params.id);
    if (!usuario) {
      return errorResponse(res, CODE.PROFILE.NOT_FOUND, null, 404);
    }

    const { nombre, nombre_usuario, correo, celular } = body;
    const updatedData = {
      nombre,
      nombre_usuario,
      correo,
      celular,
      usuario_modificacion,
    };

    if (usuario.rol === "ESTUDIANTE") {
      const { matricula } = body;
      await Estudiante.update(
        { matricula },
        { where: { id_usuario: params.id } }
      );
    }

    await Usuario.update(updatedData, { where: { id_usuario: params.id } });
    return successResponse(
      res,
      CODE.PROFILE.UPDATE_SUCCESS,
      { id_usuario: params.id, ...updatedData },
      200
    );
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.PROFILE.UPDATE_FAILED, error, 500);
  }
};

exports.updatePassword = async (req, res) => {
  const params = req.params;
  const { contrasena_actual, contrasena_nueva } = req.body;

  const { usuario_modificacion } = req.headers;

  try {
    const usuario = await Usuario.findByPk(params.id);
    if (!usuario) {
      return errorResponse(res, CODE.PROFILE.NOT_FOUND, null, 404);
    }
    const isMatch = await bcrypt.compare(contrasena_actual, usuario.contrasena);
    if (!isMatch) {
      return errorResponse(res, CODE.PROFILE.PASSWORD_MISMATCH, null, 400);
    }

    const hashedPassword = await bcrypt.hash(contrasena_nueva, 8);
    await Usuario.update(
      { contrasena: hashedPassword, usuario_modificacion },
      { where: { id_usuario: params.id } }
    );

    return successResponse(
      res,
      CODE.PROFILE.PASSWORD_UPDATE_SUCCESS,
      { id_usuario: params.id },
      200
    );
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};
