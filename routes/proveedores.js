const express = require('express');
const router = express.Router();
const { crearProveedor } = require('../controllers/proveedoresController.js');

router.post('/', crearProveedor);
module.exports = router;
