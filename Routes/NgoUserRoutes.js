const express = require('express');
const router = express.Router();

const { ngoUserLogin, ngoUserRegister } = require('../Controller/NgoUser')

router.post("/login", ngoUserLogin);

router.post("/register", ngoUserRegister);

module.exports = router;