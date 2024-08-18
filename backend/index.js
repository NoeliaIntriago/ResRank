const express = require("express");
const app = express();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT || 3001;

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log(`Server is running on port ${port}`);
  });
});
