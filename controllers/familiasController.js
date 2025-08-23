
const db = require('../db/connetion');


const crearFamilia = (req, res) => {
  const { Nombre, Descripcion } = req.body;

  const sql = `
    INSERT INTO Familias 
    (Nombre, Descripcion)
    VALUES (?, ?)
    `;  
  const values=[Nombre, Descripcion];
  db.query(sql, values, (err, result) => {
    if (err) {
  console.error('Error al insertar familia:', err);
  if (err.code==='ER_DUP_ENTRY')
      {
        return res.status(400).json({message: 'Ya existe una familia con ese nombre'});
      }
  return res.status(500).send(err);
}
    res.status(201).json({ message: 'Familia insertada', id: result.insertId });    
  });
};

const obtenerFamilias = (req, res) => {
  const sql = 'SELECT IdFamilia, Nombre, Descripcion FROM Familias';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

const actualizarFamilia =(req, res) =>
{
 const { id } = req.params;
  const {
    Nombre,
    Descripcion,                
  } = req.body;  
console.log('Datos recibidos:', req.body);
  const sql = `
    UPDATE Familias
    SET Nombre = ? ,  Descripcion = ?
    WHERE IdFamilia = ?
  `;

  const values = [Nombre, Descripcion, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al actualizar familia:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json({ message: 'Familia actualizada correctamente' });
  });
}

const eliminarFamilia = (req, res) =>
{
 const sql = `
      DELETE FROM Familias    
      WHERE IdFamilia = ?
      `;
  const values=req.params.id;  
  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al eliminar familia:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  else
  {
    res.status(201).json({ message: 'Familia eliminada'});
  }})
}

module.exports = {
  crearFamilia,
  obtenerFamilias,
  actualizarFamilia,
  eliminarFamilia
};