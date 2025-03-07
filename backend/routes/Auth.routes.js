// routes/Auth.routes.js

const express = require("express");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/Auth.controller");

const router = express.Router();

// Middleware for setting CORS headers
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Signup route with middlewares
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

// Signin route
router.post("/signin", controller.signin);

module.exports = router;
