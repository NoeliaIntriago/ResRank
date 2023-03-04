const express = require('express');
const router = express.Router();
var authController = require('../controllers/auth.controller');

router.post('/register/owner', authController.registerOwner);
router.post('/register/student', authController.registerStudent);

router.post('/login/owner', authController.loginOwner);
router.post('/login/student', authController.loginStudent);

module.exports = router;