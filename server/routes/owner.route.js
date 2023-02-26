var express = require('express');
var router = express.Router();
var ownerController = require('../controllers/owner.controller');

router.post('/', ownerController.create);
router.get('/', ownerController.findAll);
router.get('/:id', ownerController.find);
router.put('/:id', ownerController.update);
router.delete('/:id', ownerController.delete);

module.exports = router;