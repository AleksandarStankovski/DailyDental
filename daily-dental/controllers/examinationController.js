const Patient = require('mongoose').model('Patient');
const Examination = require('mongoose').model('Examination');

module.exports = {
    getByPatient: (req, res) => { 
        let id = req.params.id;
        Examination.find({patient: id})
        .sort({date: -1})
        .then(examinations => {
            res.json(examinations);
        })  
    },

    getById: (req, res) => {
        let id = req.params.id;
        Examination.findById(id)
        .then(examination => {
            res.json(examination);
        })
    },

    create: (req, res) => {
        let newExamination = req.body;
        Examination.create(newExamination)
        .then(examination => {
            return Patient.update(
                { },
                { $push: { examinations: examination._id } }
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
        let newExamination = req.body;
        Examination.findByIdAndUpdate({ _id: newExamination._id }, newExamination, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error); 
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Examination.findByIdAndRemove(id)
        .then(examination => {
            return Patient.update(
                { },
                { $pull: { examinations: examination._id } }
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