const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Define routes for signup, login, and logout
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;