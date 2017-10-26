const Clinic = require('mongoose').model('Clinic');
const Patient = require('mongoose').model('Patient');

module.exports = {
    getAll: (req, res) => { 
        Patient.find({})
        .populate('doctor', 'speciality')
        .then(patients => {
            res.json(patients);
        })  
    },

    getById: (req, res) => {
        let id = req.params.id;
        Patient.findById(id)
        .populate('doctor', 'speciality')
        .then(patient => {
            res.json(patient);
        })
    },

    create: (req, res) => {
        let newPatient = req.body;
        if (newPatient.doctor._id.length === 0) {
            newPatient.doctor = undefined;
        }
        Patient.create(newPatient)
        .then(patient => {
            return Clinic.update(
                { },
                { $push: { patients: patient._id } }
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
        let newPatient = req.body;
        Patient.findByIdAndUpdate({ _id: newPatient._id }, newPatient, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error); 
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Patient.findByIdAndRemove(id)
        .then(patient => {
            return Clinic.update(
                { },
                { $pull: { patients: patient._id } }
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