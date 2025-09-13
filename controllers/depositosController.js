
import db from '../db/connetion.js';

 const crearDeposito = async (req, res) => {
  const {
    Nombre,
    Descripcion
  } = req.body;

  console.log('Datos recibidos:', req.body);
  const sql = `
    INSERT INTO Depositos 
    (Nombre, Descripcion)
    VALUES (?, ?)
  `;
   const values = [Nombre, Descripcion];
  try {
  console.log("Valores que se insertan:", values);
  const [result] = await db.query(sql, values);
  res.status(201).json({ message: 'Deposito insertado', id: result.insertId });
  }
  catch(err) {
    console.error('Error al insertar Deposito:', err);
      if (err.code==='ER_DUP_ENTRY')
      {
        return res.status(400).json({message: 'Ya existe una deposito con ese nombre.'})
      }
      return res.status(500).send(err);
  }
};
const obtenerDepositos = async (req, res) => {
  const sql = `SELECT IdDeposito, Nombre, Descripcion FROM Depositos`;
  try {
    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    console.error('Error al obtener depositos:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const eliminarDeposito = async (req, res) => {
  const sql = `DELETE FROM Depositos WHERE IdDeposito = ?`;
  const values = [req.params.id];
  try {
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Depósito no encontrado' });
    }
    res.json({ message: 'Depósito eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar deposito:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const actualizarDeposito = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion } = req.body;

  const sql = `
    UPDATE Depositos
    SET Nombre = ?, Descripcion = ?
    WHERE IdDeposito = ?
  `;
  const values = [Nombre, Descripcion, id];

  try {
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Depósito no encontrado' });
    }
    res.json({ message: 'Depósito actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar deposito:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
export {
  crearDeposito,
  obtenerDepositos,
  eliminarDeposito,
  actualizarDeposito
};
