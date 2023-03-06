const db = require('../models');
const Local = db.local;
const Owner = db.owner;
const Op = db.Sequelize.Op;

// Crear local
exports.create = async (req, res) => {
    if (!req.body.name || !req.body.faculty || !req.body.latitude || !req.body.longitude 
        || !req.body.open_time || !req.body.close_time) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var local = { ...req.body };
    try {
        var data = await Local.create(local);
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the local."
        });
    }
};

// Obtener todos los locales
exports.findAll = async (req, res) => {
    try {
        var data = await Local.findAll({ });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting all locals."
        });
    }
};

// Obtener local por ID
exports.find = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var local = await Local.findByPk(id);
        var ownerId = local.dataValues.ownerId;
        var owner = await Owner.findByPk(ownerId);
        local["dataValues"]["owner"] = owner["name"] + " " + owner["lastName"];
        res.json(local);
    } catch (error) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the local."
        });
    }
};

// Obtener local por ID dueño
exports.findByOwner = async (req, res) => {
    if (!req.params.id_owner) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id_owner = req.params.id_owner;
    try {
        var data = await Local.findAll({
            where: {ownerId: id_owner}
        });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the locals."
        });
    }
};

// Actualizar local
exports.update = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    } else if (!req.body.name || !req.body.faculty || !req.body.latitude || !req.body.longitude 
        || !req.body.open_time || !req.body.close_time) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var id = req.params.id;
    try {
        var data = await Local.update(req.body, {
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Local was updated successfully"
            });
        } else {
            res.send({
                message: "Cannot update Local with id=${identification}. Maybe Local was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the local."
        });
    }
};

// Eliminar local
exports.delete = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var data = await Local.destroy({
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Local was deleted successfully"
            });
        } else {
            res.send({
                message: "Cannot delete Local with id=${identification}. Maybe Local was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the local."
        });
    }
};
