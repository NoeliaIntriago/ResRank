// routes/Bar.js

const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const BarController = require("../controllers/Bar.controller");
router.get("/", BarController.getAllBars);
router.get("/:id", BarController.getBarById);
router.post("/", [authJwt.verifyToken], BarController.createBar);

module.exports = router;
