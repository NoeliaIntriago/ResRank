var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var db = require('./models');
db.sequelize.sync({ force: true });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Routers
var ownerRouter = require('./routes/owner.route');

app.use("/owner", ownerRouter);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

module.exports = app;