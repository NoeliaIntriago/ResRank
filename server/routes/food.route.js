const express = require('express');
const router = express.Router();
var foodController = require('../controllers/food.controller');

router.post('/', foodController.create);
router.get('/', foodController.findAll);
router.get('/:id_local', foodController.findByLocal);
router.put('/:id', foodController.update);
router.delete('/:id', foodController.delete);

module.exports = router;