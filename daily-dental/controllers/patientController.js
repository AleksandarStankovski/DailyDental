const Clinic = require('mongoose').model('Clinic');
const Patient = require('mongoose').model('Patient');

module.exports = {
    getAll: (req, res) => { 
        Patient.find({})
        .sort({date: -1})
        .then(patients => {
            res.json(patients);
        })  
    },

    getByPage: (req, res) => {
        let currentPage = Number(req.query.currentPage) || 1;
        let itemsPerPage = Number(req.query.itemsPerPage) || 18;
        Patient.find({}).count().then(patientsLength => {
            let countPage = Math.ceil(patientsLength / itemsPerPage);
            Patient.find({})
            .populate('doctor', 'speciality')
            .sort({date: -1})
            .skip(itemsPerPage * (currentPage - 1))
            .limit(itemsPerPage)
            .then(patients => {
                res.json({countPage: countPage, patients: patients, patientsLength: patientsLength});
            })
        })
    },

    getFiltered: (req, res) => { 
        let searchText = new RegExp(req.query.searchText, 'i'); 
        Patient.find({ $or: [{ firstName: { $regex: searchText }}, { lastName: { $regex: searchText }}] })
        .sort({date: -1})
        .populate('doctor', 'speciality')
        .then(patients => {
            res.json(patients);
        })
    },

    getById: (req, res) => {
        let id = req.params.id;
        Patient.findById(id)
        .populate('doctor', 'lastName speciality')
        .then(patient => {
            res.json(patient);
        })
        .catch(error => {
            res.status(400).send(error);
        });
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
        if (newPatient.doctor._id.length === 0) {
            newPatient.doctor = undefined;
        }
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