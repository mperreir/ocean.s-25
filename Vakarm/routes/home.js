// routes/home.js
const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');

// GET / => affiche la page "home" qui ouvre 2 fenêtres
router.get('/', HomeController.showHome);

module.exports = router;
