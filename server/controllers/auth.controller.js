var db = require('../models');
var bcrypt = require("bcrypt");
var { sign } = require('jsonwebtoken');
var Owner = db.owner;
var Student = db.student;
var Op = db.Sequelize.Op;

// Crear dueño
exports.registerOwner = async (req, res) => {
    if (!req.body.name || !req.body.lastName || !req.body.cellphone || !req.body.email || !req.body.password) {
        res.status(400).send({
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
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the owner."
        });
    }
};

// Crear estudiante
exports.registerStudent = async (req, res) => {
    if (!req.body.name || !req.body.lastName || !req.body.email
        || !req.body.password || !req.body.career) {
        res.status(400).send({
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
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the student."
        });
    }
};

// Login owner
exports.loginOwner = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    var { email, password } = req.body;
    const owner = await Owner.findOne({ where: { email: email } });

    if (!owner) res.json({ error: "Owner doesn't exist" });

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
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var { email, password } = req.body;
    const student = await Student.findOne({ where: { email: email } });

    if (!student) res.json({ error: "Student doesn't exist" });

    bcrypt.compare(password, student.password).then((match) => {
        if (!match) res.json({ error: "Wrong username or password!" });
        res.json("Success");
    });

};