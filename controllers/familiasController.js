
const db = require('../db/connetion');


const crearFamilia = (req, res) => {
  const { Nombre, Descripcion } = req.body;

  const sql = `
    INSERT INTO Familias 
    (Nombre, Descripcion)
    VALUES (?, ?)
    `;  
  db.query(sql, [Nombre, Descripcion], (err, result) => {
    if (err) {
  console.error('Error al insertar familia:', err);
  return res.status(500).send(err);
}
    res.status(201).json({ message: 'Familia insertada', id: result.insertId });    
  });
};

const obtenerFamilias = (req, res) => {
  const sql = 'SELECT IdFamilia, Nombre FROM Familias';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

module.exports = {
  crearFamilia,
  obtenerFamilias
};