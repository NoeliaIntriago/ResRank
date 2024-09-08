const express = require("express");
const router = express.Router();

const { Bar } = require("../models");

router.get("/", async (req, res) => {
  const { id_usuario, nombre, tipo_menu, id_facultad } = req.query;

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

    const bares = await Bar.findAll({
      where: condition,
    });
    res.json(bares);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  try {
    const bar = await Bar.create(body);
    res.json(bar);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
