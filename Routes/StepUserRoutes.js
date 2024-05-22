const express = require('express');
const router = express.Router();

const { stepUserLogin, stepUserRegister } = require('../Controller/StepUser')

router.post("/login", stepUserLogin);

router.post("/register", stepUserRegister);

module.exports = router;