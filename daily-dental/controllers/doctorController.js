const Doctor = require('mongoose').model('Doctor');

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
        Doctor.create(newDoctor)
        .then(result => {
            res.json('Success');
        }).catch(error => {
            res.status(400).send(error);
        });
    },

    edit: (req, res) => {
        let newDoctor = req.body;
        Doctor.findById(newDoctor._id)
        .then(doctor => {
            doctor.firstName = newDoctor.firstName;
            doctor.lastName = newDoctor.lastName;
            doctor.egn = newDoctor.egn;
            doctor.phone = newDoctor.phone;
            doctor.address = newDoctor.address;
            doctor.email = newDoctor.email;
            doctor.speciality = newDoctor.speciality;
            doctor.active = newDoctor.active;
            doctor.save()
            .then(() => {
                res.json('Success');
            }).catch(error => {
                res.status(400).send(error);
            })
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Doctor.findByIdAndRemove(id)
        .then(() => {
            res.json('Success');
        }).catch(error => {
            res.status(400).send(error);
        })
    }
}