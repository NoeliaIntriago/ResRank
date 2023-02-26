const express = require('express');
const router = express.Router();
const db = require('../models/');
const Owner = db.Owner;

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post("/", async (req, res) => {
    console.log(req);
    if (!req.body.name || !req.body.lastName || !req.body.cellphone || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const owner = { ...req.body };
    try { 
        const data = await Owner.create(owner);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Owner."
        });
    }
});

module.exports = router;