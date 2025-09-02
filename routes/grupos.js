import express from 'express';

import { crearGrupo, obtenerGrupos, actualizarGrupo, eliminarGrupo } from '../controllers/gruposController.js';
const router = express.Router();
router.post('/crear', crearGrupo);
router.get('/', obtenerGrupos);
router.put('/actualizar/:id', actualizarGrupo);
router.delete('/eliminar/:id', eliminarGrupo);
export default router;
