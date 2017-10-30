const Clinic = require('mongoose').model('Clinic');
const Doctor = require('mongoose').model('Doctor');
const encryption = require('../utilities/encryption');

module.exports = {
    getAll: (req, res) => { 
        Doctor.find({})
        .sort({date: -1})
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
        let salt = encryption.generateSalt();
        let passwordHash = encryption.hashPassword(newDoctor.password, salt);
        newDoctor.passwordHash = passwordHash;
        newDoctor.salt = salt;
        Doctor.create(newDoctor)
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
        if (newDoctor.password) {
            let salt = encryption.generateSalt();
            let passwordHash = encryption.hashPassword(newDoctor.password, salt);
            newDoctor.passwordHash = passwordHash;
            newDoctor.salt = salt;
        }
        Doctor.findByIdAndUpdate({ _id: newDoctor._id }, newDoctor, { upsert: true })
        .then(doctor => {
            if (res.locals.user._id == newDoctor._id) {
                req.logOut();
            }
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        if (res.locals.user.role === 'admin' || res.locals.user.role === 'reception') {
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
        } else {
            res.status(400).send('Unauthorized!');
        }

    }
}