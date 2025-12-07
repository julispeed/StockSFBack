import express from 'express';

import { stocksArticulos, stockArticulosporDeposito } from '../controllers/stocksController.js';

const router = express.Router();

router.get('/stockArticulos', stocksArticulos);
router.get('/stockArticulosPorDepositos',stockArticulosporDeposito);
export default router;
