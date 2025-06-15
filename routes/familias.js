const express = require('express');
const router = express.Router();
const { crearFamilia, obtenerFamilias } = require('../controllers/familiasController.js');

router.post('/', crearFamilia);
router.get('/', obtenerFamilias);
module.exports = router;
