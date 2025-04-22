const { OpinionRestaurante, Usuario } = require("../models");
const { Op } = require("sequelize");
const { getPagingData, getPagination } = require("./utils/pagination");
const logger = require("../services/logger");

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
    console.error(error);
    res.status(400).json({ message: "Error fetching reviews", error });
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

    res.status(201).json(newReview);
  } catch (error) {
    logger.error(error);
    console.error(error);
    res.status(400).json({ message: "Error creating review", error });
  }
};
