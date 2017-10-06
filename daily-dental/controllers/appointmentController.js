const Appointment = require('mongoose').model('Appointment');

module.exports = {
    getAll: (req, res) => { 
        Appointment.find({})
        .then(appointments => {
            res.json(appointments)
        })
    },

    getById: (req, res) => {
        let id = req.params.id;
        Appointment.findById(id)
        .then(appointment => {
            res.json(appointment);
        })
    },

    create: (req, res) => {
        let newAppointment = req.body;
        Appointment.create(newAppointment)
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        });
    },

    edit: (req, res) => {
        let newAppointment = req.body;
        Appointment.findByIdAndUpdate({ _id: newAppointment._id }, newAppointment, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Appointment.findByIdAndRemove(id)
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    }
}