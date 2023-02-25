const express = require('express');
const app = express();

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

const db = require('./models');
db.sequelize.sync({ force: true });
