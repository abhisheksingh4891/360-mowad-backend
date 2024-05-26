const express = require('express');
const router = express.Router();

const { ngoUserLogin, ngoUserRegister, ngoUserProfile } = require('../Controller/NgoUser')

router.post("/login", ngoUserLogin);

router.post("/register", ngoUserRegister);

router.get("/profile", ngoUserProfile);

module.exports = router;