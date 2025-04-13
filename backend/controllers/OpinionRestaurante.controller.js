const { OpinionRestaurante, Usuario } = require("../models");
const { Op } = require("sequelize");
const { getPagingData, getPagination } = require("./utils/pagination");
const logger = require("../services/logger");

exports.getReviews = async (req, res) => {
  const { id_bar, id_usuario, calificacion, page = 1, perPage } = req.query;
  const { limit, offset } = getPagination(page, perPage);

  try {
    const condition = {};
    if (id_bar) condition.id_bar = id_bar;
    if (id_usuario) condition.id_usuario = id_usuario;
    if (calificacion) condition.calificacion = calificacion;

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
    console.error(error);
    res.status(400).json({ message: "Error fetching reviews", error });
  }
};
