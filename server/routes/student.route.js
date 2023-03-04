const express = require('express');
const router = express.Router();
var studentController = require('../controllers/student.controller');

router.get('/', studentController.findAll);
router.get('/:id', studentController.find);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

module.exports = router;