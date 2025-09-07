
import db from '../db/connetion.js';

const crearFamilia = async (req, res) => {
  const { Nombre, Descripcion } = req.body;
  const sql = `INSERT INTO Familias (Nombre, Descripcion) VALUES (?, ?)`;
  const values = [Nombre, Descripcion];

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Familia insertada', id: result.insertId });
  } catch (err) {
    console.error('Error al insertar familia:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ya existe una familia con ese nombre' });
    }
    res.status(500).json({ error: err.message });
  }
};

const obtenerFamilias = async (req, res) => {
  const sql = 'SELECT IdFamilia, Nombre, Descripcion FROM Familias';
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error al obtener familias:', err);
    res.status(500).json({ error: err.message });
  }
};

const actualizarFamilia = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion } = req.body;
  const sql = `UPDATE Familias SET Nombre = ?, Descripcion = ? WHERE IdFamilia = ?`;
  const values = [Nombre, Descripcion, id];

  try {
    await db.query(sql, values);
    res.json({ message: 'Familia actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar familia:', err);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
  }
};

const eliminarFamilia = async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Familias WHERE IdFamilia = ?`;

  try {
    await db.query(sql, [id]);
    res.status(201).json({ message: 'Familia eliminada' });
  } catch (err) {
    console.error('Error al eliminar familia:', err);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
  }
};

export {
  crearFamilia,
  obtenerFamilias,
  actualizarFamilia,
  eliminarFamilia
};

/*
import db from '../db/connetion.js';



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

export  {
  crearFamilia,
  obtenerFamilias,
  actualizarFamilia,
  eliminarFamilia
};*/