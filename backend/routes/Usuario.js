const express = require("express");
const router = express.Router();

const { Usuario } = require("../models");

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  try {
    const usuario = await Usuario.create(body);
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
