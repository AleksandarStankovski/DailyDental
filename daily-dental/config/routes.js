const manipulationController = require('../controllers/manipulationController');
const doctorController = require('../controllers/doctorController');
const officeController = require('../controllers/officeController');

module.exports = function (app, config) {
  app.get('/api/manipulations', manipulationController.getAll);
  app.get('/api/manipulation/:id', manipulationController.getById);
  app.post('/api/manipulation/create', manipulationController.create);
  app.put('/api/manipulation/edit', manipulationController.edit);
  app.delete('/api/manipulation/:id', manipulationController.delete);
  app.get('/api/doctors', doctorController.getAll);
  app.get('/api/doctor/:id', doctorController.getById);
  app.post('/api/doctor/create', doctorController.create);
  app.put('/api/doctor/edit', doctorController.edit);
  app.delete('/api/doctor/:id', doctorController.delete);
  app.get('/api/offices', officeController.getAll);
  app.get('/api/office/:id', officeController.getById);
  app.post('/api/office/create', officeController.create);
  app.put('/api/office/edit', officeController.edit);
  app.delete('/api/office/:id', officeController.delete);
  app.get('/*', function (req, res) {
    res.sendFile(config.rootFolder + '/dist/index.html');
  });
}
