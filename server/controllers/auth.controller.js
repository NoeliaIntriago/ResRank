var db = require('../models');
var bcrypt = require("bcrypt");
var { sign } = require('jsonwebtoken');
var Owner = db.owner;
var Student = db.student;
var Op = db.Sequelize.Op;

// Crear dueño
exports.registerOwner = async (req, res) => {
    if (!req.body.name || !req.body.lastName || !req.body.cellphone || !req.body.email || !req.body.password) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    }
    var { name, lastName, cellphone, email, password, userType } = req.body;

    try {
        bcrypt.hash(password, 10).then((hash) => {
            Owner.create({
                name: name,
                lastName: lastName,
                cellphone: cellphone,
                email: email,
                password: hash,
                userType: userType
            });
            res.send("Success!");
        });
    } catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while creating the owner."
        });
    }
};

// Crear estudiante
exports.registerStudent = async (req, res) => {
    if (!req.body.name || !req.body.lastName || !req.body.email
        || !req.body.password || !req.body.career) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    }
    var { name, lastName, email, password, career, userType } = req.body;

    try {
        bcrypt.hash(password, 10).then((hash) => {
            Student.create({
                name: name,
                lastName: lastName,
                career: career,
                email: email,
                password: hash,
                userType: userType
            });
            res.send("Success!");
        });
    } catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while creating the student."
        });
    }
};

// Login owner
exports.loginOwner = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Content can't be empty" });
    }
    
    var { email, password } = req.body;
    const owner = await Owner.findOne({ where: { email: email } });

    if (!owner) return res.status(400).json({ error: "Owner doesn't exist" });

    bcrypt.compare(password, owner.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong username or password!" });
        const accessToken = sign(
            { id: owner.id, email: owner.email, userType: owner.userType }, 
            "secretToken"
        );
        res.json(accessToken);
    });
};

// Login student
exports.loginStudent = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.json({ error: "Content can't be empty" });
    }

    var { email, password } = req.body;
    const student = await Student.findOne({ where: { email: email } });

    if (!student) return res.json({ error: "Student doesn't exist" });

    bcrypt.compare(password, student.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong username or password!" });
        const accessToken = sign(
            { id: student.id, email: student.email, userType: student.userType }, 
            "secretToken"
        );
        res.json(accessToken);
    });

};