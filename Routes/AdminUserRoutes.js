const express = require('express');
const router = express.Router();

const { adminUserLogin } = require('../Controller/AdminUser')

router.post("/login", adminUserLogin);

module.exports = router;