import express from 'express';
import cors from 'cors';
import articulosRoutes from './routes/articulos.js';
import familiasRoutes from './routes/familias.js';
import gruposRoutes from './routes/grupos.js';
import depositoRoutes from './routes/depositos.js';
import ProveedoresRoutes from './routes/proveedores.js';
import movimientosRoutes from './routes/movimientosStock.js';
import stoksRoutes from './routes/stocks.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de tu API
app.use('/articulos', articulosRoutes);
app.use('/familias', familiasRoutes);
app.use('/grupos', gruposRoutes);
app.use('/depositos', depositoRoutes);
app.use('/proveedores', ProveedoresRoutes);
app.use('/movimientos', movimientosRoutes);
app.use('/stocks', stoksRoutes);

// Ruta raíz para comprobar que el server responde
app.get("/", (req, res) => {
  res.send("✅ API funcionando en Railway 🚀");
});

// Railway usa su propio puerto (PORT), si no existe, usar 3000 en local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});
