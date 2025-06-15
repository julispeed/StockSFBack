
const db = require('../db/connetion');


const crearGrupo = (req, res) => {
  const { Nombre, Descripcion, IdFamilia } = req.body;

  const sql = `
    INSERT INTO GrupoArticulos
    (Nombre, Descripcion, IdFamilia)
    VALUES (?, ?,?)
    `;  
  db.query(sql, [Nombre, Descripcion, IdFamilia], (err, result) => {
    if (err) {
  console.error('Error al insertar grupo:', err);
  return res.status(500).send(err);
}
    res.status(201).json({ message: 'Grupo Insertado', id: result.insertId });    
  });
};

const obtenerGrupos = (req, res) => {
  const sql = 'SELECT IdGrupoArticulo, Nombre FROM GrupoArticulos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

module.exports = {
  crearGrupo,
  obtenerGrupos
};