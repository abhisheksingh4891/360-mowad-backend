const express = require('express');
const router = express.Router();

const { adminUserLogin, adminUserProfile } = require('../Controller/AdminUser')

router.post("/login", adminUserLogin);

router.get("/profile", adminUserProfile);

module.exports = router;