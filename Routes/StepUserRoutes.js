const express = require('express');
const router = express.Router();

const { stepUserLogin, stepUserRegister, stepUserProfile } = require('../Controller/StepUser')

router.post("/login", stepUserLogin);

router.post("/register", stepUserRegister);

router.get("/profile", stepUserProfile);

module.exports = router;