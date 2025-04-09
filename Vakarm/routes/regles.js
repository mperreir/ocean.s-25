// routes/regles.js
const express = require('express');
const router = express.Router();
const ReglesController = require('../controllers/ReglesController');

router.get('/', ReglesController.showRegles);

module.exports = router;
