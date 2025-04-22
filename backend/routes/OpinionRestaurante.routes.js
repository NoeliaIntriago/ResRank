const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const OpinionController = require("../controllers/OpinionRestaurante.controller");

router.get("/", OpinionController.getReviews);
router.post("/", [authJwt.verifyToken], OpinionController.createReview);

module.exports = router;
