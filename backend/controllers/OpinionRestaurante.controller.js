const { OpinionRestaurante, Usuario } = require("../models");
const { Op } = require("sequelize");
const { getPagingData, getPagination } = require("./utils/pagination");
const logger = require("../services/logger");
const { errorResponse, successResponse } = require("./utils/response");
const CODE = require("./utils/response/codes");

exports.getReviews = async (req, res) => {
  const {
    id_bar,
    id_usuario,
    calificacion,
    comentario,
    page = 1,
    perPage,
  } = req.query;
  const { limit, offset } = getPagination(page, perPage);

  try {
    const condition = {};
    if (id_bar) condition.id_bar = id_bar;
    if (id_usuario) condition.id_usuario = id_usuario;
    if (calificacion > 0) condition.calificacion = calificacion;
    if (comentario) {
      condition.comentario = {
        [Op.like]: `%${comentario}%`,
      };
    }

    const data = await OpinionRestaurante.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: [["fecha_creacion", "DESC"]],
      include: [{ model: Usuario, as: "usuario" }],
    });

    res.json(getPagingData(data, page, limit));
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.createReview = async (req, res) => {
  const { id_bar, id_usuario, calificacion, comentario } = req.body;
  try {
    const { usuario_creacion } = req.headers;

    const newReview = await OpinionRestaurante.create({
      id_bar,
      id_usuario,
      calificacion,
      comentario,
      usuario_creacion,
    });

    return successResponse(res, CODE.REVIEW.CREATE_SUCCESS, newReview, 201);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.REVIEW.CREATE_FAILED, error, 500);
  }
};
