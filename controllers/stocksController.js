import db from '../db/connetion.js';

const stocksArticulos = async (req, res) => {
  const sql = `
    SELECT
        a.IdArticulo,
        a.Codigo,
        a.Descripcion,
        a.Unidad_medida,
        a.Codigo_barra,
        a.Precio,
        a.Costo,
        a.IdGrupoArticulos,
        COALESCE(SUM(
            CASE 
                WHEN m.TipoMovimiento IN ('ING','DEV') THEN md.Cantidad
                WHEN m.TipoMovimiento IN ('EGR','VEN') THEN -md.Cantidad
                ELSE 0
            END
        ), 0) AS StockActual
    FROM Articulos a
    LEFT JOIN MovimientosDetalleStock md ON a.IdArticulo = md.IdArticulo
    LEFT JOIN MovimientosStock m ON md.IdMovimientoStock = m.IdMovimientoStock
    GROUP BY 
        a.IdArticulo,
        a.Codigo,
        a.Descripcion,
        a.Unidad_medida,
        a.Codigo_barra,
        a.Precio,
        a.Costo,
        a.IdGrupoArticulos
    ORDER BY a.Descripcion;
  `;

  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error("Error en listado:", err);  
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const stockArticulosporDeposito = async (req, res) => {
  const { iddeposito } = req.query;

  try {
    const [results] = await db.query(
      `
      SELECT
          a.IdArticulo,
          a.Codigo,
          a.Descripcion,
          a.Unidad_medida,
          a.Codigo_barra,
          a.Precio,
          a.Costo,
          a.IdGrupoArticulos,
          COALESCE(SUM(
              CASE 
                  WHEN m.TipoMovimiento IN ('ING','DEV') THEN md.Cantidad
                  WHEN m.TipoMovimiento IN ('EGR','VEN') THEN -md.Cantidad
                  ELSE 0
              END
          ), 0) AS StockActual
      FROM Articulos a
      LEFT JOIN MovimientosDetalleStock md 
          ON a.IdArticulo = md.IdArticulo
      LEFT JOIN MovimientosStock m 
          ON md.IdMovimientoStock = m.IdMovimientoStock
          AND m.IdDeposito = ?   -- 🔥 FILTRADO CORRECTO AQUÍ
      GROUP BY 
          a.IdArticulo,
          a.Codigo,
          a.Descripcion,
          a.Unidad_medida,
          a.Codigo_barra,
          a.Precio,
          a.Costo,
          a.IdGrupoArticulos
      ORDER BY a.Descripcion;
    `,
      [iddeposito]
    );
    res.json(results);
  } catch (err) {
    console.error("Error al obtener stock por depósito:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
export { stocksArticulos,stockArticulosporDeposito };
