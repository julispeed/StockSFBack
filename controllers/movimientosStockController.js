
import db from '../db/connetion.js';

const crearMovimiento = (req, res) => {
  const { TipoMovimiento, Prefijo, IdDeposito, Articulos } = req.body;

  if (!TipoMovimiento || !Prefijo || !IdDeposito || !Articulos?.length) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }
  const sqlUltimo = `
    SELECT MAX(Numero) AS maxNumero 
    FROM MovimientosStock 
    WHERE TipoMovimiento = ? AND Prefijo = ?
  `;
  db.query(sqlUltimo, [TipoMovimiento, Prefijo], (err, result) => {
    if (err) return res.status(500).send(err);

    const nuevoNumero = (result[0].maxNumero || 0) + 1;

    const sqlInsertMovimiento = `
      INSERT INTO MovimientosStock (TipoMovimiento, Prefijo, Numero, IdDeposito)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sqlInsertMovimiento, [TipoMovimiento, Prefijo, nuevoNumero, IdDeposito], (err2, result2) => {
      if (err2) return res.status(500).send(err2);

      const idMovimiento = result2.insertId;

      const sqlInsertDetalle = `
        INSERT INTO MovimientosDetalleStock (IdMovimientoStock, IdArticulo, Cantidad)
        VALUES ?
      `;

      const valores = Articulos.map(a => [idMovimiento, a.IdArticulo, a.Cantidad]);

      db.query(sqlInsertDetalle, [valores], (err3) => {
        if (err3) return res.status(500).send(err3);

        res.status(201).json({
          message: 'Movimiento registrado correctamente',
          Numero: `${Prefijo}-${nuevoNumero}`,
          IdMovimientoStock: idMovimiento
        });
      });
    });
  });
};

 const obtenerProximoMovimiento=(req, res) => {

  const { TipoMovimiento, Prefijo } = req.query;

  if (!TipoMovimiento || !Prefijo) {
    return res.status(400).json({ message: 'Faltan parámetros' });

  };

  const sql = `
    SELECT MAX(Numero) AS maxNumero
    FROM MovimientosStock
    WHERE TipoMovimiento = ? AND Prefijo = ?
  `;

  db.query(sql, [TipoMovimiento,Prefijo],(err,result)=>{
    if (err) return res.status(500).send(err);
    const proximoNumero = (result[0].maxNumero || 0)+1;
    res.json({proximoNumero});
  })
}

export  { 
  crearMovimiento,
  obtenerProximoMovimiento
 };
