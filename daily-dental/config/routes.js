const manipulationController = require('../controllers/manipulationController')

module.exports = function (app, config) {
  app.get('/api/manipulations', manipulationController.getAll);
  app.get('/api/manipulation/:id', manipulationController.getById);
  app.post('/api/manipulation/create', manipulationController.create);
  app.post('/api/manipulation/edit', manipulationController.edit);
  app.delete('/api/manipulation/:id', manipulationController.delete);
  app.get('/*', function (req, res) {
    res.sendFile(config.rootFolder + '/dist/index.html');
  });
}
