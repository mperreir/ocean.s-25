// routes/greenov.js
const express = require('express');
const router = express.Router();
const GreenovController = require('../controllers/GreenovController');

router.get('/', GreenovController.showGreenov);

module.exports = router;
