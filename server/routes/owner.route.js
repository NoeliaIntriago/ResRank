var express = require('express');
var router = express.Router();
var ownerController = require('../controllers/owner.controller');

router.get('/', ownerController.findAll);
router.post('/', ownerController.create);

module.exports = router;