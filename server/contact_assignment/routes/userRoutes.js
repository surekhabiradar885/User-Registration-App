const express = require('express');
const { model } = require('mongoose');
const authController = require('../controller/authController');
const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);

module.exports = router;