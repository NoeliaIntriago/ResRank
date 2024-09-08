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
    res.json(facultad);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
