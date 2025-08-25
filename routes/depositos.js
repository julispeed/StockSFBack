const express = require('express');
const router = express.Router();
const { crearDeposito, obtenerDepositos, eliminarDeposito, actualizarDeposito} = require('../controllers/depositosController.js');

router.post('/crear', crearDeposito);
router.get('/', obtenerDepositos);
router.delete('/eliminar/:id', eliminarDeposito);
router.put('/actualizar/:id', actualizarDeposito);
module.exports = router;
