// index.js

const express = require("express");
const bodyParser = require("body-parser");

const logger = require("./services/logger");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const port = process.env.PORT || 3001;

// ROUTERS
const authRouter = require("./routes/Auth.routes");
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

const usuarioRouter = require("./routes/Usuario.routes");
app.use("/api/usuario", usuarioRouter);

const facultadRouter = require("./routes/Facultad.routes");
app.use("/api/facultad", facultadRouter);

const barRouter = require("./routes/Bar.routes");
app.use("/api/bar", barRouter);

const opinionRestauranteRouter = require("./routes/OpinionRestaurante.routes");
app.use("/api/review", opinionRestauranteRouter);

const perfilRouter = require("./routes/Perfil.routes");
app.use("/api/perfil", perfilRouter);

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error(error);
  });
