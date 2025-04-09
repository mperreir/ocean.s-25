// routes/index2.js
const express = require('express');
const router = express.Router();

const Index2Controller = require('../controllers/Index2Controller');

// GET /index2 => affiche la page "index2"
router.get('/', Index2Controller.showIndex2);

module.exports = router;
