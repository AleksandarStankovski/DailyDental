const clinicController = require('../controllers/clinicController');
const officeController = require('../controllers/officeController');
const manipulationController = require('../controllers/manipulationController');
const doctorController = require('../controllers/doctorController');
const patientController = require('../controllers/patientController');

module.exports = function (app, config) {
  	app.get('/api/clinics', clinicController.getAll);
	app.get('/api/clinic/:id', clinicController.getById);
	app.post('/api/clinic/create', clinicController.create);
	app.put('/api/clinic/edit', clinicController.edit);
	app.get('/api/offices', officeController.getAll);
	app.get('/api/office/:id', officeController.getById);
	app.post('/api/office/create', officeController.create);
	app.put('/api/office/edit', officeController.edit);
	app.delete('/api/office/delete/:id', officeController.delete);
	app.get('/api/doctors', doctorController.getAll);
	app.get('/api/doctor/:id', doctorController.getById);
	app.post('/api/doctor/create', doctorController.create);
	app.put('/api/doctor/edit', doctorController.edit);
	app.delete('/api/doctor/delete/:id', doctorController.delete);
	app.get('/api/manipulations', manipulationController.getAll);
	app.get('/api/manipulation/:id', manipulationController.getById);
	app.post('/api/manipulation/create', manipulationController.create);
	app.put('/api/manipulation/edit', manipulationController.edit);
	app.delete('/api/manipulation/delete/:id', manipulationController.delete);
	app.get('/api/patients', patientController.getAll);
	app.get('/api/patient/:id', patientController.getById);
	app.post('/api/patient/create', patientController.create);
	app.put('/api/patient/edit', patientController.edit);
	app.delete('/api/patient/delete/:id', patientController.delete);
	app.get('/*', function (req, res) {
		res.sendFile(config.rootFolder + '/dist/index.html');
  	});
}
