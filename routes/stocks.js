const express = require('express');
const router = express.Router();
const { stocksArticulos } = require('../controllers/stocksController.js');

router.get('/stockArticulos', stocksArticulos);
module.exports = router;
