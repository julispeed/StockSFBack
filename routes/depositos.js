const express = require('express');
const router = express.Router();
const { crearDeposito, obtenerDepositos} = require('../controllers/depositosController.js');

router.post('/', crearDeposito);
router.get('/', obtenerDepositos);
module.exports = router;
