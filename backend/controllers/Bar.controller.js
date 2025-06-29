// controllers/Bar.controller.js

const { Bar, Facultad, Menu, Usuario } = require("../models");
const { Op } = require("sequelize");
const { getPagingData, getPagination } = require("./utils/pagination");
const logger = require("../services/logger");
const { errorResponse, successResponse } = require("./utils/response");
const CODE = require("./utils/response/codes");

exports.getAllBars = async (req, res) => {
  const {
    id_usuario,
    nombre,
    tipo_menu,
    id_facultad,
    activo,
    page = 1,
    perPage,
  } = req.query;
  const { limit, offset } = getPagination(page, perPage);

  try {
    const condition = {};
    if (id_usuario) condition.id_dueno = id_usuario;
    if (nombre) condition.nombre = { [Op.like]: `%${nombre}%` };
    if (tipo_menu) condition.tipo_menu = tipo_menu;
    if (id_facultad) condition.id_facultad = id_facultad;
    if (activo) condition.activo = activo;

    const data = await Bar.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: [["nombre", "ASC"]],
      include: [{ model: Facultad, as: "facultad" }],
    });

    return res.json(getPagingData(data, page, limit));
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.getBarById = async (req, res) => {
  const { id } = req.params;

  try {
    const bar = await Bar.findByPk(id, {
      include: [
        { model: Facultad, as: "facultad" },
        { model: Menu, as: "menu" },
        { model: Usuario, as: "dueno" },
      ],
    });

    if (!bar) {
      return errorResponse(res, CODE.BAR.NOT_FOUND, null, 404);
    }

    res.json(bar);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.createBar = async (req, res) => {
  const { body } = req;

  try {
    const { usuario_creacion } = req.headers;

    const bar = await Bar.create({
      ...body,
      usuario_creacion,
      fecha_creacion: new Date(),
    });

    for (const item of body.menu) {
      await Menu.create({
        ...item,
        id_bar: bar.id_bar,
        usuario_creacion,
        fecha_creacion: new Date(),
      });
    }

    return successResponse(
      res,
      CODE.BAR.CREATE_SUCCESS,
      { id_bar: bar.id_bar, ...body },
      201
    );
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.BAR.CREATE_FAILED, error, 500);
  }
};

exports.updateBar = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const { usuario_modificacion } = req.headers;

    await Bar.update(
      { ...body, usuario_modificacion, fecha_modificacion: new Date() },
      { where: { id_bar: id } }
    );

    await Menu.destroy({ where: { id_bar: id } });

    for (const item of body.menu) {
      await Menu.create({
        ...item,
        id_bar: id,
        usuario_creacion: usuario_modificacion,
        fecha_creacion: new Date(),
      });
    }

    return successResponse(
      res,
      CODE.BAR.UPDATE_SUCCESS,
      { id_bar: id, ...body },
      200
    );
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.BAR.UPDATE_FAILED, error, 500);
  }
};

exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  try {
    const { usuario_modificacion } = req.headers;

    await Bar.update(
      { activo, usuario_modificacion, fecha_modificacion: new Date() },
      { where: { id_bar: id } }
    );

    return successResponse(res, CODE.BAR.UPDATE_SUCCESS, { id_bar: id }, 200);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.BAR.UPDATE_FAILED, error, 500);
  }
};
