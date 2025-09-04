
import db from '../db/connetion.js';

 const crearDeposito = async (req, res) => {
  const {
    Nombre,
    Descripcion
  } = req.body;

  console.log('Datos recibidos:', req.body);

  try {
  const sql = `
    INSERT INTO Depositos 
    (Nombre, Descripcion)
    VALUES (?, ?)
  `;

  const values = [Nombre, Descripcion];
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
 const obtenerDepositos = (req, res) => {
  const sql=`Select IdDeposito, Nombre, IdDeposito from Depositos`;
  db.query(sql ,(err,result)=>{
    if (err) return res.status(500).send(err);
    res.json(result);
  })
};

const eliminarDeposito =(req, res) => {
      const sql = `
    DELETE FROM Depositos    
      WHERE IdDeposito = ?
  `;
  const values=req.params.id;  
  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al eliminar deposito:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  else
  {
    res.status(201).json({ message: 'Deposito eliminado'});
  }})
}
 const actualizarDeposito =(req, res) =>
{
 const { id } = req.params;
  const {
    Nombre,
    Descripcion,                
  } = req.body;  
console.log('Datos recibidos:', req.body);
  const sql = `
    UPDATE Descripcion
    SET Nombre = ? ,  Descripcion = ?
    WHERE IdDeposito = ?
  `;

  const values = [Nombre, Descripcion, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al actualizar deposito:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json({ message: 'Deposito actualizada correctamente' });
  });
}
export {
  crearDeposito,
  obtenerDepositos,
  eliminarDeposito,
  actualizarDeposito
};
