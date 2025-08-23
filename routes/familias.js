const express = require('express');
const router = express.Router();
const { crearFamilia, obtenerFamilias, actualizarFamilia,eliminarFamilia } = require('../controllers/familiasController.js');

router.post('/crear', crearFamilia);
router.get('/', obtenerFamilias);
router.put('/actualizar/:id', actualizarFamilia);
router.delete('/eliminar/:id', eliminarFamilia);
module.exports = router;
