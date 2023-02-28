const express = require('express');
const router = express.Router();
var opinionController = require('../controllers/opinion.controller');

router.post('/', opinionController.create);
router.get('/', opinionController.findAll);
router.get('/local/:id_local', opinionController.findByLocal);
router.get('/student/:id_student', opinionController.findByStudent);
router.put('/:id', opinionController.update);
router.delete('/:id', opinionController.delete);

module.exports = router;