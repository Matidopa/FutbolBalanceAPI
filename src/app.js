const express = require('express');
const mongoose = require('mongoose');
const setupRoutes = require('./api/routes'); // Lo crearemos después

const app = express();

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
setupRoutes(app); // Acá después vamos a enchufar las rutas

module.exports = app;
