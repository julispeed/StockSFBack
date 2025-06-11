
const db = require('../db/connetion');


const crearArticulo = (req, res) => {
  const { descripcion, unidad_medida, codigoBarra, codigo, precio, costo } = req.body;

  const sql = `
    INSERT INTO Articulos 
    (descripcion, unidad_medida, codigo_barra, codigo, precio, costo, IdGrupoArticulos)
  VALUES (?, ?, ?, ?, ?, ?, 1)
  `;
  //const sql =`Use Stock`;
  db.query(sql, [descripcion, unidad_medida, codigoBarra, codigo, precio, costo], (err, result) => {
    if (err) {
    console.error(db.query(sql));
    return res.status(500).send(err);
  }
    res.status(201).json({ message: 'Artículo insertado', id: result.insertId });
    //console.error(db.query(sql));
  });
};

module.exports = {
  crearArticulo,
};
