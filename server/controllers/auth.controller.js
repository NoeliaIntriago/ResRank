var db = require('../models');
var bcrypt = require("bcrypt");
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
    var {name, lastName, cellphone, email, password, userType} = req.body;
    
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
    } catch(err) {
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
    var student = { ...req.body };
    try {
        var data = await Student.create(student);
        res.send(data);
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the student."
        });
    }
};

// Login owner
exports.loginOwner = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var {email, password} = req.body;
    const owner = await Owner.findOne({ where: { email: email }});

    if (!owner){
        res.send("Owner doesn't exist");
    } else {
        bcrypt.compare(password, owner.password).then((match) => {
            if(!match){
                res.send("Wrong username or password!");
            } else {
                res.send("Success");
            }
        });
    }
};

// Login student
exports.loginStudent = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var {email, password} = req.body;
    const student = await Student.findOne({ where: { email: email }});

    if (!owner){
        res.send("Student doesn't exist");
    } else {
        bcrypt.compare(password, student.password).then((match) => {
            if(!match){
                res.send("Wrong username or password!");
            } else {
                res.send("Success");
            }
        });
    }
};