const db = require('../db/connetion');


const crearGrupo = (req, res) => {
  const {
    Nombre,
    Descripcion,
    IdFamilia } = req.body;

    console.log('Datos recibidos:', req.body);

  const sql = `
    INSERT INTO GruposArticulos
    (Nombre, Descripcion, IdFamilia)
    VALUES (?, ?,?)
    `;  

const values = [Nombre,Descripcion,IdFamilia];    
    
  db.query(sql, values, (err, result) => {
    if (err) {
  console.error('Error al insertar grupo:', err);
  if (err.code==='ER_DUP_ENTRY') {
      return res.status(400).json({message: 'Ya existe un grupo con ese nombre'});
    }
  return res.status(500).send(err);
}
    res.status(201).json({ message: 'Grupo Insertado', id: result.insertId });    
  });
};

const obtenerGrupos = (req, res) => {
  const sql = 'SELECT IdGrupoArticulo, Nombre, Descripcion, IdFamilia FROM GruposArticulos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

const actualizarGrupo = (req, res) => {
  const { id } = req.params;
  const {
    Nombre,
    Descripcion,            
    IdFamilia
  } = req.body;  

  const sql = `
    UPDATE GruposArticulos
    SET Nombre = ? ,  Descripcion = ?,  IdFamilia = ?
    WHERE IdGrupoArticulo = ?
  `;

  const values = [Nombre, Descripcion, IdFamilia, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al actualizar grupo:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json({ message: 'Grupo actualizado correctamente' });
  });
};

const eliminarGrupo = (req, res) => {
      const sql = `
      DELETE FROM GruposArticulos    
      WHERE IdGrupoArticulo = ?
      `;
  const values=req.params.id;  
  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al eliminar grupo:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  else
  {
    res.status(201).json({ message: 'Grupo eliminado'});
  }})
}

module.exports = {
  crearGrupo,
  obtenerGrupos,
  actualizarGrupo,
  eliminarGrupo
};