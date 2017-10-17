const Clinic = require('mongoose').model('Clinic');
const Doctor = require('mongoose').model('Doctor');
const encryption = require('../utilities/encryption');

module.exports = {
    getAll: (req, res) => { 
        Doctor.find({})
        .then(doctors => {
            res.json(doctors);
        })  
    },

    getById: (req, res) => {
        let id = req.params.id;
        Doctor.findById(id)
        .then(doctor => {
            res.json(doctor);
        })
    },

    create: (req, res) => {
        let newDoctor = req.body;
        Doctor.findOne({email: newDoctor.email})
        .then(doctor => {
            let errorMsg = '';
            if (doctor) {
                errorMsg = 'User with the same username exists!';
            } 
            if (errorMsg) {
                res.status(400).send(error);
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(newDoctor.password, salt);
                newDoctor.passwordHash = passwordHash;
                newDoctor.salt = salt;
                return Doctor.create(newDoctor)
                .then(doctor => {
                    return doctor;  
                })
            }
        })
        .then(doctor => {
            return Clinic.update(
                { },
                { $push: { doctors: doctor._id } }
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
        let newDoctor = req.body;
        Doctor.findByIdAndUpdate({ _id: newDoctor._id }, newDoctor, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Doctor.findByIdAndRemove(id)
        .then(doctor => {
            return Clinic.update(
                { },
                { $pull: { doctors: doctor._id } }
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