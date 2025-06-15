const express = require('express');
const router = express.Router();
const { crearGrupo, obtenerGrupos } = require('../controllers/gruposController.js');

router.post('/', crearGrupo);
router.get('/', obtenerGrupos);
module.exports = router;
