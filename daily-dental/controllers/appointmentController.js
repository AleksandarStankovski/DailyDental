const Appointment = require('mongoose').model('Appointment');
const Doctor = require('mongoose').model('Doctor');
const moment= require('moment');

module.exports = {
    getAll: (req, res) => { 
        Doctor.find({})
        .populate('appointments')
        .then(doctors => {
            res.json(doctors)
        })
    },

    getByDate: (req, res) => { 
        let date = req.params.date;
        let queryDate = new Date(date);
        Doctor.find({})
        .populate({
            path: 'appointments',
            match: { date:  queryDate}
        })
        .then(doctors => {
            res.json(doctors)
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
        .then(appointment => {
            return Doctor.update(
                { _id: appointment.doctor },
                { $push: { appointments: appointment._id } }
            )
        })
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
        .then(appointment => {
            if (appointment.doctor != newAppointment.doctor) {
                return Doctor.update(
                    { _id: appointment.doctor },
                    { $pull: { appointments: newAppointment._id } }
                )
                .then (() => {
                    return appointment;
                })
            } else {
                return appointment;
            }
        })
        .then(appointment => {
            if (appointment.doctor != newAppointment.doctor) {
                return Doctor.update(
                    { _id: newAppointment.doctor },
                    { $push: { appointments: newAppointment._id } }
                )
            } else {
                return appointment;
            }
        })
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
        .then(appointment => {
            return Doctor.update(
                { _id: appointment.doctor },
                { $pull: { appointments: appointment._id } }
            )
        })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    }
}