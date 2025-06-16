const express = require('express');
const cors = require('cors');
const app = express();
const articulosRoutes = require('./routes/articulos');
const familiasRoutes = require('./routes/familias');
const gruposRoutes = require('./routes/grupos');
const depositoRoutes = require('./routes/depositos');

app.use(cors());
app.use(express.json());


app.use('/articulos', articulosRoutes);
app.use('/familias', familiasRoutes);  
app.use('/grupos', gruposRoutes);               
app.use('/depositos', depositoRoutes);               

app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));

