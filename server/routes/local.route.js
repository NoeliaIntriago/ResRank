const express = require('express');
const router = express.Router();
var localController = require('../controllers/local.controller');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post('/', validateToken, localController.create);
router.get('/', localController.findAll);
router.get('/:id_owner', localController.findByOwner);
router.put('/:id', localController.update);
router.delete('/:id', localController.delete);

module.exports = router;