import express from 'express';

import { crearFamilia, obtenerFamilias, actualizarFamilia,eliminarFamilia } from '../controllers/familiasController.js';
const router = express.Router();
router.post('/crear', crearFamilia);
router.get('/', obtenerFamilias);
router.put('/actualizar/:id', actualizarFamilia);
router.delete('/eliminar/:id', eliminarFamilia);
export default router;
