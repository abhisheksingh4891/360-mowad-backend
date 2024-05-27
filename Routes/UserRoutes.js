const express = require('express');
const router = express.Router();

const {UserRegister} = require("../Controller/UserRegister")

router.post("/apply", UserRegister);

module.exports = router;