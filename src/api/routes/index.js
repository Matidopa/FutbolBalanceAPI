module.exports = function (app) {
    app.get('/', (req, res) => {
      res.send('API de Organización de Partidos funcionando ⚽');
    });
  
    // Acá después conectamos más rutas como:
    // app.use('/jugadores', require('./jugadores.route'));
  };
  