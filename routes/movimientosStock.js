const express = require('express');
const router = express.Router();
const { crearMovimiento, obtenerProximoMovimiento } = require('../controllers/movimientosStockController');

router.post('/', crearMovimiento);
router.get('/proximo-numero', obtenerProximoMovimiento);

module.exports = router;
