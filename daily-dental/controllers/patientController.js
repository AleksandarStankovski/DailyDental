const Patient = require('mongoose').model('Patient');
const Doctor = require('mongoose').model('Doctor');
const mongoose = require('mongoose');
let doctorId  = '59d224a71666d51ed0548f7a';

module.exports = {
    getAll: (req, res) => { 
        Patient.find({})
        .then(patients => {
            res.json(patients);
        })  
    },

    getById: (req, res) => {
        let id = req.params.id;
        Patient.findById(id)
        .then(patient => {
            res.json(patient);
        })
    },

    create: (req, res) => {
        let newPatient = req.body;
        Patient.create(newPatient)
        .then(patient => {
            Doctor.findById(doctorId)
            .then(doctor => {
                doctor.patients.push(patient._id);
                doctor.save()
                .then(result => {
                    console.log(result)
                    res.json('Success');
                }).catch(error => {
                    res.status(400).send(error);
                });
            }).catch(error => {
                res.status(400).send(error);
            });
        }).catch(error => {
            res.status(400).send(error);
        });
    },

    edit: (req, res) => {
        let newPatient = req.body;
        Patient.findById(newPatient._id)
        .then(patient => {
            patient.firstName = newPatient.firstName;
            patient.lastName = newPatient.lastName;
            patient.phone = newPatient.phone;
            patient.address = newPatient.address;
            patient.email = newPatient.email;
            patient.doctor = "59d224a71666d51ed0548f7a";
            patient.save()
            .then(() => {
                res.json('Success');
            }).catch(error => {
                res.status(400).send(error);
            })
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Patient.findByIdAndRemove(id)
        .then(() => {
            res.json('Success');
        }).catch(error => {
            res.status(400).send(error);
        })
    }
}