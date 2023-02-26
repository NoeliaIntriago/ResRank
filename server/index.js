const express = require('express');
const app = express();

const db = require('./models');
db.sequelize.sync({ force: true });

// Routers
const ownerRouter = require('./routes/owner');

app.use("/owners", ownerRouter);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

