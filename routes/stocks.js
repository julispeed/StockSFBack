import express from 'express';

import { stocksArticulos } from '../controllers/stocksController.js';

const router = express.Router();

router.get('/stockArticulos', stocksArticulos);
export default router;
