import express from 'express';

import { crearProveedor, obtenerProveedores, eliminarProveedor,actualizarProveedor } from '../controllers/proveedoresController.js';

const router = express.Router();

router.post('/crear', crearProveedor);
router.get('/', obtenerProveedores);
router.delete('/eliminar/:id', eliminarProveedor);
router.put('/actualizar/:id', actualizarProveedor);
export default router;