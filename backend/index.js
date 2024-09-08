const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const port = process.env.PORT || 3001;

// ROUTERS
const loginRouter = require("./routes/Login");
app.use(bodyParser.json());
app.use("/auth", loginRouter);

const usuarioRouter = require("./routes/Usuario");
app.use("/usuario", usuarioRouter);

const facultadRouter = require("./routes/Facultad");
app.use("/facultad", facultadRouter);

const barRouter = require("./routes/Bar");
app.use("/bar", barRouter);

const opinionRestauranteRouter = require("./routes/OpinionRestaurante");
app.use("/opinion-restaurante", opinionRestauranteRouter);

const db = require("./models");
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log(`Server is running on port ${port}`);
  });
});
