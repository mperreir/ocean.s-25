// routes/oceansim.js
const express = require('express');
const router = express.Router();
const OceansimController = require('../controllers/OceansimController');

router.get('/', OceansimController.showOceansim);

module.exports = router;
