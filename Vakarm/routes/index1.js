// routes/index1.js
const express = require('express');
const router = express.Router();

const Index1Controller = require('../controllers/Index1Controller');

// GET /index1 => affiche la page "index1"
router.get('/', Index1Controller.showIndex1);

module.exports = router;
