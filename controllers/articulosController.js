
const db = require('../db/connetion');

const crearArticulo = (req, res) => {
  const {
    Descripcion,
    Unidad_medida,
    Codigo_barra,
    Codigo,
    Precio,
    Costo,
    IdGrupoArticulos
  } = req.body;

  console.log('Datos recibidos:', req.body);

  const sql = `
    INSERT INTO Articulos 
    (Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos];
console.log(values);
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar artículo:', err);
       if (err.code === 'ER_DUP_ENTRY') {
        let field = 'artículo';
        if (err.sqlMessage.includes('Codigo')) field = 'código';
        else if (err.sqlMessage.includes('Codigo_barra')) field = 'código de barra';
        else if (err.sqlMessage.includes('Descripcion')) field = 'descripción';

        return res.status(400).json({
          code: 'DUPLICATE_ENTRY',
          field,
          message: `Ya existe un artículo con ese ${field}.`
        });
      }

      return res.status(500).json({
        code: 'DB_ERROR',
        message: 'Error inesperado al insertar artículo.',
        details: err
      });
    }

    res.status(201).json({
      message: 'Artículo insertado',
      id: result.insertId
    });
  });
};

const buscarArticulo =(req,res)=>
{
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
};

const listarArticulo = (req, res) => {
  const sql = `
    SELECT IdArticulo, Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos
    FROM Articulos
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al listar artículos:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    res.json(results);
  });
};


const actualizarArticulo = (req, res) => {
  const { id } = req.params;
  const {
    Descripcion,
    Unidad_medida,
    Codigo_barra,
    Codigo,
    Precio,
    Costo,
    IdGrupoArticulos
  } = req.body;
  
  if (!Descripcion || !Unidad_medida) {
    return res.status(400).json({ message: 'Descripción y unidad de medida son obligatorias' });
  }

  const sql = `
    UPDATE Articulos
    SET Descripcion = ?, Unidad_medida = ?, Codigo_barra = ?, Codigo = ?, Precio = ?, Costo = ?, IdGrupoArticulos = ?
    WHERE IdArticulo = ?
  `;

  const values = [Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al actualizar artículo:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json({ message: 'Artículo actualizado correctamente' });
  });
};

const elminarArticulo = (req, res) =>{
    const sql = `
    DELETE FROM Articulos    
      WHERE IdArticulo = ?
  `;
  const values=req.params.id;  
  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al eliminar artículo:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  else
  {
    res.status(201).json({ message: 'Artículo eliminado'});
  }})
}

module.exports = {
  crearArticulo,
  buscarArticulo,
  listarArticulo,
  actualizarArticulo,
  elminarArticulo
};
