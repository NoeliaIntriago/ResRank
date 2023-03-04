const db = require('../models');
const Student = db.student;
const Op = db.Sequelize.Op;

// Obtener todos los estudiantes
exports.findAll = async (req, res) => {
    try {
        var data = await Student.findAll({ });
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting all students."
        });
    }
};

// Obtener estudiante por ID
exports.find = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var data = await Student.findByPk(id);
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the student."
        });
    }
};

// Actualizar estudiante
exports.update = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    } else if (!req.body.name || !req.body.lastName || !req.body.email 
        || !req.body.password || !req.body.career) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var id = req.params.id;
    try {
        var data = await Student.update(req.body, {
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Student was updated successfully"
            });
        } else {
            res.send({
                message: "Cannot update Student with id=${identification}. Maybe Student was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the student."
        });
    }
};

// Eliminar estudiante
exports.delete = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "ID not valid"
        });
    }
    var id = req.params.id;
    try {
        var data = await Student.destroy({
            where: {id: id}
        });
        if (data == 1) {
            res.send({
                message: "Student was deleted successfully"
            });
        } else {
            res.send({
                message: "Cannot delete Student with id=${identification}. Maybe Student was not found or req.body is empty"
            });
        }
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the student."
        });
    }
};