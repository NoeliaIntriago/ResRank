// routes/Facultad.js

const express = require("express");
const router = express.Router();
const FacultadController = require("../controllers/Facultad.controller");

router.get("/", FacultadController.getAllFacultades);
router.post("/", FacultadController.createFacultad);
router.put("/:id_facultad", FacultadController.updateFacultad);

module.exports = router;
