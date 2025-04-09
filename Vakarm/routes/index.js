// routes/index.js
const express = require('express');
const router = express.Router();

const homeRouter = require('./home');
const index1Router = require('./index1');
const index2Router = require('./index2');
const reglesRouter = require('./regles');
const mapRouter = require('./map');
const oceansimRouter = require('./oceansim');
const infosRouter = require('./infos');
const greenovRouter = require('./greenov');


// On monte les routeurs
router.use('/', homeRouter);        // => '/'
router.use('/index1', index1Router);
router.use('/index2', index2Router);

// On monte nos sous-routeurs
router.use('/regles', reglesRouter);
router.use('/map', mapRouter);
router.use('/oceansim', oceansimRouter);
router.use('/infos', infosRouter);
router.use('/greenov', greenovRouter);

module.exports = router;
