// routes/map.js
const express = require('express');
const router = express.Router();
const MapController = require('../controllers/MapController');

router.get('/', MapController.showMap);

module.exports = router;
