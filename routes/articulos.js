const express = require('express');
const router = express.Router();
const { crearArticulo, buscarArticulo,listarArticulo,  actualizarArticulo, elminarArticulo} = require('../controllers/articulosController.js');


router.post('/crear', crearArticulo);
router.get('/buscar', buscarArticulo);
router.get('/listar', listarArticulo);
router.put('/actualizar/:id', actualizarArticulo);
router.delete('/eliminar/:id', elminarArticulo);

module.exports = router;
