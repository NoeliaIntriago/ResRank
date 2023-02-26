var db = require('../models');
var Owner = db.owner;
var Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.lastName || !req.body.cellphone || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty! "
        });
        return;
    }
    var owner = { ...req.body };
    Owner.create(owner)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Owner."
        });
    })
};

exports.findAll = (req, res) => {
    Owner.findAll({

    })
    .then(data => {

        res.send("hello worlds");
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Owner."
        });
    })
};