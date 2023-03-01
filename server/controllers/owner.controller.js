var db = require('../models');
var Owner = db.owner;
var Op = db.Sequelize.Op;

// Crear dueño
exports.create = async (req, res) => {
    if (!req.body.name || !req.body.lastName || !req.body.cellphone || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var owner = { ...req.body };
    try {
        console.log(owner);
        var data = await Owner.create(owner);
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the owner."
        });
    }
};

// Obtener todos los dueños
exports.findAll = async (req, res) => {
    try {
        var data = await Owner.findAll({ });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting all owners."
        });
    }
};

// Obtener dueño por ID
exports.find = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var data = await Owner.findByPk(id);
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the owner."
        });
    }
};

// Actualizar dueño
exports.update = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    } else if (!req.body.name || !req.body.lastName || !req.body.cellphone || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var id = req.params.id;
    try {
        var data = await Owner.update(req.body, {
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Owner was updated successfully"
            });
        } else {
            res.send({
                message: "Cannot update Owner with id=${identification}. Maybe Owner was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the owner."
        });
    }
};

// Eliminar dueño
exports.delete = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var data = await Owner.destroy({
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Owner was deleted successfully"
            });
        } else {
            res.send({
                message: "Cannot delete Owner with id=${identification}. Maybe Owner was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the owner."
        });
    }
};
