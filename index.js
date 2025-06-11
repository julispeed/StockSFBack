const express = require('express');
const cors = require('cors');
const app = express();
const articulosRoutes = require('./routes/articulos');

app.use(cors());
app.use(express.json());

// Ruta base para artículos
app.use('/articulos', articulosRoutes);

app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));



/*
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Laika2020',
  database: process.env.DB_NAME || 'Stock',
});


db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL');
});


app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));
*/