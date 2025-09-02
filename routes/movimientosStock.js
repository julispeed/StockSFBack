import express from 'express';

import { crearMovimiento, obtenerProximoMovimiento } from '../controllers/movimientosStockController.js';

const router = express.Router();

router.post('/', crearMovimiento);
router.get('/proximo-numero', obtenerProximoMovimiento);

export default router;
