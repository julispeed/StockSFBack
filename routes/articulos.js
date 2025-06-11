const express = require('express');
const router = express.Router();
const { crearArticulo } = require('../controllers/articulosController.js');

router.post('/', crearArticulo);

module.exports = router;
