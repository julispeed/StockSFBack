import express from 'express';

import { crearDeposito, obtenerDepositos, eliminarDeposito, actualizarDeposito} from '../controllers/depositosController.js';

const router = express.Router();

router.post('/crear', crearDeposito);
router.get('/', obtenerDepositos);
router.delete('/eliminar/:id', eliminarDeposito);
router.put('/actualizar/:id', actualizarDeposito);

export default router;

