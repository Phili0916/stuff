const express = require('express');
const router = express.Router();
const modelUser = require("../model/user_model");

const userCtrl = require('../Controllers/user_controllers')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.delete('/delete', userCtrl.delete)

module.exports = router