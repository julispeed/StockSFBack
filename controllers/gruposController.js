import db from '../db/connetion.js';
const crearGrupo = async (req, res) => {
  const { Nombre, Descripcion, IdFamilia } = req.body;
  console.log('Datos recibidos:', req.body);
  const sql = `
    INSERT INTO GruposArticulos
    (Nombre, Descripcion, IdFamilia)
    VALUES (?, ?,?)
    `;  
  const values = [Nombre,Descripcion,IdFamilia];    
  
  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Grupo Insertado', id: result.insertId });
  }
  catch (err) {
    console.error('Error al insertar grupo:', err);
    if (err.code==='ER_DUP_ENTRY') {
      return res.status(400).json({message: 'Ya existe un grupo con ese nombre'});
    }
    return res.status(500).send(err);
  }
};

const obtenerGrupos = async (req, res) => {
  const sql = 'SELECT IdGrupoArticulo, Nombre, Descripcion, IdFamilia FROM GruposArticulos';
  try {
      const [results] = await db.query(sql);
      res.json(results);
  }
  catch(err) {
     console.error('Error al obtener grupos:', err);
    res.status(500).json({ error: err.message });
  }

};

const actualizarGrupo = async (req, res) => {
  const { id } = req.params;
  const {Nombre, Descripcion, IdFamilia} = req.body;  
  const sql = `
    UPDATE GruposArticulos
    SET Nombre = ? ,  Descripcion = ?,  IdFamilia = ?
    WHERE IdGrupoArticulo = ?
  `;
  const values = [Nombre, Descripcion, IdFamilia, id];

try {
  await db.query(sql, values);
  res.json({ message: 'Grupo actualizado correctamente' });
}
catch (err) {
      console.error('Error al actualizar grupo:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
}

};

const eliminarGrupo = async (req, res) => {
  const { id } = req.params;
      const sql = `
      DELETE FROM GruposArticulos    
      WHERE IdGrupoArticulo = ?
      `;  

  try {
    await db.query(sql, [id]);
    res.status(201).json({ message: 'Grupo eliminado'});
  }
  catch (err) {
      console.error('Error al eliminar grupo:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
  }

}

export  {
  crearGrupo,
  obtenerGrupos,
  actualizarGrupo,
  eliminarGrupo
};