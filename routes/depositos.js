const express = require('express');
const router = express.Router();
const { crearDeposito} = require('../controllers/depositosController.js');

router.post('/', crearDeposito);

module.exports = router;
