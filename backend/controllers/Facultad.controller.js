// controllers/Facultad.controller.js

const { Facultad } = require("../models");

exports.getAllFacultades = async (req, res) => {
  try {
    const facultades = await Facultad.findAll({
      order: [["nombre", "ASC"]],
    });
    res.json(facultades);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error retrieving faculties", error });
  }
};

exports.createFacultad = async (req, res) => {
  const body = req.body;

  try {
    const facultad = await Facultad.create(body);
    res.status(201).json({ facultad, message: "Facultad creada" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear la facultad", error });
  }
};

exports.updateFacultad = async (req, res) => {
  const { id_facultad } = req.params;
  const body = req.body;

  try {
    const [updatedRows] = await Facultad.update(body, {
      where: { id_facultad },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Facultad not found" });
    }

    res.json({ message: "Facultad actualizada" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al actualizar la facultad", error });
  }
};
