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
var foodRouter = require('./routes/food.route');
var localRouter = require('./routes/local.route');
var opinionRouter = require('./routes/opinion.route');
var ownerRouter = require('./routes/owner.route');
var studentRouter = require('./routes/student.route');
var registerRouter = require('./routes/auth.route');

app.use("/food", foodRouter);
app.use("/local", localRouter);
app.use("/opinion", opinionRouter);
app.use("/owner", ownerRouter);
app.use("/student", studentRouter);
app.use("/auth", registerRouter);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

module.exports = app;