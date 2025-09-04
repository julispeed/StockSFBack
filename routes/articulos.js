import express from 'express';
import { crearArticulo, buscarArticulo, listarArticulo, actualizarArticulo, elminarArticulo } from '../controllers/articulosController.js';

const router = express.Router();

router.post('/crear', crearArticulo);
router.get('/buscar', buscarArticulo);
router.get('/listar', listarArticulo);
router.put('/actualizar/:id', actualizarArticulo);
router.delete('/eliminar/:id', elminarArticulo);

export default router;
