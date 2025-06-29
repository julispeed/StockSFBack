const express = require('express');
const router = express.Router();
const db = require('../db/connetion');
const { crearArticulo } = require('../controllers/articulosController.js');

router.post('/', crearArticulo);

router.get('/buscar', (req, res) => {
  const { termino } = req.query;

  if (!termino) {
    return res.status(400).json({ message: 'Falta el término de búsqueda' });
  }

  const sql = `
    SELECT IdArticulo, Descripcion, Codigo_barra, Codigo, Precio, Costo 
    FROM Articulos 
    WHERE Codigo LIKE ? OR Codigo_barra = ? OR Descripcion LIKE ?
  `;
const likeTerm = `%${termino}%`;
db.query(sql, [likeTerm, termino, likeTerm], (err, results) => {
    if (err) {
      console.error('Error al buscar artículo:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


module.exports = router;
