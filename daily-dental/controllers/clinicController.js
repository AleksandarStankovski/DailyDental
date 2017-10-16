const Clinic = require('mongoose').model('Clinic');

module.exports = {
    getAll: (req, res) => { 
        Clinic.find({})
        .then(clinics => {
            res.json(clinics);
        })
    },

    getById: (req, res) => {
        let id = req.params.id;
        Clinic.findById(id)
        .then(clinic => {
            res.json(clinic);
        })
    },

    create: (req, res) => {
        let newClinic = req.body;
        Clinic.create(newClinic)
        .then(result => {
            res.json('Success');
        }).catch(error => {
            res.status(400).send(error);
        });
    },

    edit: (req, res) => {
        let newClinic = req.body;
        Clinic.findByIdAndUpdate({ _id: newClinic._id }, newClinic, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    }
}