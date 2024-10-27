// controllers/Bar.controller.js

const { Bar, Facultad, Menu } = require("../models");
const { Op } = require("sequelize");

exports.getAllBars = async (req, res) => {
  const {
    id_usuario,
    nombre,
    tipo_menu,
    id_facultad,
    page = 1,
    perPage,
  } = req.query;
  const limit = perPage ? Number(perPage) : 10;
  const offset = (page - 1) * limit;

  try {
    const condition = {};
    if (id_usuario) {
      condition.id_dueno = id_usuario;
    }

    if (nombre) {
      condition.nombre = {
        [Op.like]: `%${nombre}%`,
      };
    }

    if (tipo_menu) {
      condition.tipo_menu = tipo_menu;
    }

    if (id_facultad) {
      condition.id_facultad = id_facultad;
    }

    const { count, rows: bares } = await Bar.findAndCountAll({
      where: condition,
      order: [["nombre", "ASC"]],
      limit,
      offset,
      include: [{ model: Facultad, as: "facultad" }],
    });

    res.json({
      bares,
      currentPage: page,
      perPage: limit,
      total: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.getBarById = async (req, res) => {
  const { id } = req.params;

  try {
    const bar = await Bar.findByPk(id, {
      include: [
        { model: Facultad, as: "facultad" },
        { model: Menu, as: "menu" },
      ],
    });

    if (!bar) {
      return res.status(404).json({ message: "Bar not found" });
    }

    res.json(bar);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.createBar = async (req, res) => {
  const { body } = req;

  try {
    const bar = await Bar.create({
      ...body,
      id_dueno: req.user.id_usuario,
      usuario_creacion: req.user.nombre_usuario,
      fecha_creacion: new Date(),
    });

    for (const item of body.menu) {
      await Menu.create({
        ...item,
        id_bar: bar.id_bar,
        usuario_creacion: req.user.nombre_usuario,
        fecha_creacion: new Date(),
      });
    }

    res.status(201).json(bar);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
