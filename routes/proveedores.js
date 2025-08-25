const express = require('express');
const router = express.Router();
const { crearProveedor, obtenerProveedores, eliminarProveedor,actualizarProveedor } = require('../controllers/proveedoresController.js');

router.post('/crear', crearProveedor);
router.get('/', obtenerProveedores);
router.delete('/eliminar/:id', eliminarProveedor);
router.put('/actualizar/:id', actualizarProveedor);
module.exports = router;
