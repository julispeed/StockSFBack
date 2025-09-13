import db from '../db/connetion.js';



const stocksArticulos = async (req, res) => {
  const sql = 
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
      db.query(sql);
      res.json(results);
  }
  catch (err) {
    console.error("Error en listado:", err);  
    res.status(500).json({ message: 'Error en el servidor', error: err });
  }
};

export  {
  stocksArticulos,
}