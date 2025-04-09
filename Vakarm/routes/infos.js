// routes/infos.js
const express = require('express');
const router = express.Router();
const InfosController = require('../controllers/InfosController');

router.get('/', InfosController.showInfos);

module.exports = router;
