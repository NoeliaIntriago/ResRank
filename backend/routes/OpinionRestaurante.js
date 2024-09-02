const express = require("express");
const router = express.Router();

const { OpinionRestaurante } = require("../models");

router.get("/", async (req, res) => {
  try {
    const opiniones = await OpinionRestaurante.findAll();
    res.json(opiniones);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  try {
    const opinion = await OpinionRestaurante.create(body);
    res.json(opinion);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
