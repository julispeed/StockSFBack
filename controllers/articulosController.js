
const db = require('../db/connetion');
const crearArticulo = (req, res) => {
  const {
    descripcion,
    unidad_medida,
    codigoBarra,
    codigo,
    precio,
    costo,
    IdGrupoArticulo
  } = req.body;

  console.log('Datos recibidos:', req.body); // ✅ Esto sí sirve

  const sql = `
    INSERT INTO Articulos 
    (Descripcion, Unidad_medida, Codigo_barra, Codigo, Precio, Costo, IdGrupoArticulos)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [descripcion, unidad_medida, codigoBarra, codigo, precio, costo, IdGrupoArticulo];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar artículo:', err); // ✅ Imprime el error real
      return res.status(500).send(err);
    }

    res.status(201).json({ message: 'Artículo insertado', id: result.insertId });
  });
};

module.exports = {
  crearArticulo,
};
