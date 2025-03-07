// controllers/Bar.controller.js

const { Bar, Facultad, Menu, Usuario } = require("../models");
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
        { model: Usuario, as: "dueno" },
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

    res.status(201).json(bar);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating bar", error });
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

    res.json({ message: "Bar updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating bar", error });
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

    res.json({ message: "Bar status updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating bar status", error });
  }
};
