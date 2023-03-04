const db = require('../models');
const Opinion = db.opinion;
const Op = db.Sequelize.Op;

// Crear opinión
exports.create = async (req, res) => {
    if (!req.body.score || !req.body.details) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var opinion = { ...req.body };
    console.log(opinion);
    try {
        var data = await Opinion.create(opinion);
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the opinion."
        });
    }
};

// Obtener todas las opiniones
exports.findAll = async (req, res) => {
    try {
        var data = await Opinion.findAll({ });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting all opinions."
        });
    }
};

// Obtener opinión por local ID
exports.findByLocal = async (req, res) => {
    if (!req.params.id_local) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id_local = req.params.id_local;
    try {
        var data = await Opinion.findAll({
            where: {localId: id_local}
        });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the opinions."
        });
    }
};

// Obtener opinión por student ID
exports.findByStudent = async (req, res) => {
    if (!req.params.id_student) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id_student = req.params.id_student;
    try {
        var data = await Opinion.findAll({
            where: {studentId: id_student}
        });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the opinions."
        });
    }
};

// Actualizar opinión
exports.update = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    } else if (!req.body.score || !req.body.details) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var id = req.params.id;
    try {
        var data = await Opinion.update(req.body, {
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Opinion was updated successfully"
            });
        } else {
            res.send({
                message: "Cannot update Opinion with id=${identification}. Maybe Opinion was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the opinion."
        });
    }
};

// Eliminar opinión
exports.delete = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var data = await Opinion.destroy({
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Opinion was deleted successfully"
            });
        } else {
            res.send({
                message: "Cannot delete Opinion with id=${identification}. Maybe Opinion was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the opinion."
        });
    }
};
