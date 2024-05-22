const express = require('express');
const router = express.Router();

const { feedback } = require('../Controller/Feedback')

router.post("/feedback", feedback);

module.exports = router;