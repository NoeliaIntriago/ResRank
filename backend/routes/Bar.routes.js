// routes/Bar.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const BarController = require("../controllers/Bar.controller");
router.get("/", BarController.getAllBars);
router.get("/:id", BarController.getBarById);
router.post("/", verifyToken, BarController.createBar);

module.exports = router;
