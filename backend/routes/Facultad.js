const express = require("express");
const router = express.Router();

const { Facultad } = require("../models");

router.get("/", async (req, res) => {
  try {
    const facultades = await Facultad.findAll({
      order: [["nombre", "ASC"]],
    });
    res.json(facultades);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  try {
    const facultad = await Facultad.create(body);
    res.json(facultad, { message: "Facultad creada" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error, { message: "Error al crear la facultad" });
  }
});

router.put("/:id_facultad", async (req, res) => {
  const { id_facultad } = req.params;
  const body = req.body;

  try {
    await Facultad.update(body, { where: { id_facultad } });
    res.json({ message: "Facultad actualizada" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error, { message: "Error al actualizar la facultad" });
  }
});

module.exports = router;
