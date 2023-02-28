var db = require('../models');
var Food = db.food;
var Op = db.Sequelize.Op;

// Crear comida
exports.create = async (req, res) => {
    if (!req.body.price || !req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var food = { ...req.body };
    try {
        var data = await Food.create(food);
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the food."
        });
    }
};

// Obtener todas las comidas
exports.findAll = async (req, res) => {
    try {
        var data = await Food.findAll({ });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting all foods."
        });
    }
};

// Obtener comida por ID
exports.findByLocal = async (req, res) => {
    if (!req.params.id_local) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id_local = req.params.id_local;
    try {
        var data = await Food.findAll({
            where: {localId: id_local}
        });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the food."
        });
    }
};

// Actualizar comida
exports.update = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    } else if (!req.body.price || !req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var id = req.params.id;
    try {
        var data = await Food.update(req.body, {
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Food was updated successfully"
            });
        } else {
            res.send({
                message: "Cannot update Food with id=${identification}. Maybe Food was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the food."
        });
    }
};

// Eliminar comida
exports.delete = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var data = await Food.destroy({
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Food was deleted successfully"
            });
        } else {
            res.send({
                message: "Cannot delete Food with id=${identification}. Maybe Food was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the food."
        });
    }
};
