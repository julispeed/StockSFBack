import db from '../db/connection.js';

// Crear artículo
const crearArticulo = async (req, res) => {
  const {
    Descripcion,
    Unidad_medida,
    Codigo_barra,
    Codigo,
    Precio,
    Costo,
    IdGrupoArticulos
  } = req.body;

  try {
    const sql = `
      INSERT INTO Articulos 
      (Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos];

    const [result] = await db.query(sql, values);

    res.status(201).json({
      message: 'Artículo insertado',
      id: result.insertId
    });

  } catch (err) {
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

    res.status(500).json({
      code: 'DB_ERROR',
      message: 'Error inesperado al insertar artículo.',
      details: err
    });
  }
};

// Buscar artículo
const buscarArticulo = async (req, res) => {
  const { termino } = req.query;

  if (!termino) {
    return res.status(400).json({ message: 'Falta el término de búsqueda' });
  }

  try {
    const sql = `
      SELECT IdArticulo, Descripcion, Codigo_barra, Codigo, Precio, Costo 
      FROM Articulos 
      WHERE Codigo LIKE ? OR Codigo_barra = ? OR Descripcion LIKE ?
    `;
    const likeTerm = `%${termino}%`;
    const [results] = await db.query(sql, [likeTerm, termino, likeTerm]);

    res.json(results);
  } catch (err) {
    console.error('Error al buscar artículo:', err);
    res.status(500).send(err);
  }
};

// Listar artículos
const listarArticulo = async (req, res) => {
  try {
    const sql = `
      SELECT IdArticulo, Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos
      FROM Articulos
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error al listar artículos:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar artículo
const actualizarArticulo = async (req, res) => {
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

  try {
    const sql = `
      UPDATE Articulos
      SET Descripcion = ?, Unidad_medida = ?, Codigo_barra = ?, Codigo = ?, Precio = ?, Costo = ?, IdGrupoArticulos = ?
      WHERE IdArticulo = ?
    `;
    const values = [Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos, id];

    await db.query(sql, values);

    res.json({ message: 'Artículo actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar artículo:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar artículo
const eliminarArticulo = async (req, res) => {
  try {
    const sql = `DELETE FROM Articulos WHERE IdArticulo = ?`;
    await db.query(sql, [req.params.id]);

    res.status(200).json({ message: 'Artículo eliminado' });
  } catch (err) {
    console.error('Error al eliminar artículo:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export {
  crearArticulo,
  buscarArticulo,
  listarArticulo,
  actualizarArticulo,
  eliminarArticulo
};
