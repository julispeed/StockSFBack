
import db from '../db/connetion.js';
const crearMovimiento = async (req, res) => {
  const { TipoMovimiento, Prefijo, IdDeposito, Articulos } = req.body;

  if (!TipoMovimiento || !Prefijo || !IdDeposito || !Articulos?.length) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  try {
    // Obtener último número
    const sqlUltimo = `
      SELECT MAX(Numero) AS maxNumero 
      FROM MovimientosStock 
      WHERE TipoMovimiento = ? AND Prefijo = ?
    `;
    const [rows] = await db.query(sqlUltimo, [TipoMovimiento, Prefijo]);
    const nuevoNumero = (rows[0]?.maxNumero || 0) + 1;

    // Insertar movimiento
    const sqlInsertMovimiento = `
      INSERT INTO MovimientosStock (TipoMovimiento, Prefijo, Numero, IdDeposito)
      VALUES (?, ?, ?, ?)
    `;
    const [resultMovimiento] = await db.query(sqlInsertMovimiento, [
      TipoMovimiento,
      Prefijo,
      nuevoNumero,
      IdDeposito
    ]);
    const idMovimiento = resultMovimiento.insertId;

    // Insertar detalle
    const sqlInsertDetalle = `
      INSERT INTO MovimientosDetalleStock (IdMovimientoStock, IdArticulo, Cantidad)
      VALUES ?
    `;
    const valores = Articulos.map(a => [idMovimiento, a.IdArticulo, a.Cantidad]);
    await db.query(sqlInsertDetalle, [valores]);

    // Respuesta final
    res.status(201).json({
      message: 'Movimiento registrado correctamente',
      Numero: `${Prefijo}-${nuevoNumero}`,
      IdMovimientoStock: idMovimiento
    });
  } catch (err) {
    console.error("Error al crear movimiento:", err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

 const obtenerProximoMovimiento= async (req, res) => {

  const { TipoMovimiento, Prefijo } = req.query;

  if (!TipoMovimiento || !Prefijo) {
    return res.status(400).json({ message: 'Faltan parámetros' });

  };

  const sql = `
    SELECT MAX(Numero) AS maxNumero
    FROM MovimientosStock
    WHERE TipoMovimiento = ? AND Prefijo = ?
  `;
try {
  const [rows] = await db.query(sql, [TipoMovimiento, Prefijo]);
  const proximoNumero = (rows[0]?.maxNumero || 0) + 1;
  res.json({ proximoNumero });
} catch (err) {
  console.error("Error al obtener próximo número:", err);
  res.status(500).json({ message: "Error interno del servidor" });
}

}

export  { 
  crearMovimiento,
  obtenerProximoMovimiento
 };
