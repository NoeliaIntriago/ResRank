const express = require("express");
const router = express.Router();

const { Bar } = require("../models");

router.get("/", async (req, res) => {
  try {
    const bares = await Bares.findAll();
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
