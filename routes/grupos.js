const express = require('express');
const router = express.Router();
const { crearGrupo, obtenerGrupos, actualizarGrupo, eliminarGrupo } = require('../controllers/gruposController.js');

router.post('/crear', crearGrupo);
router.get('/', obtenerGrupos);
router.put('/actualizar/:id', actualizarGrupo);
router.delete('/eliminar/:id', eliminarGrupo);
module.exports = router;
