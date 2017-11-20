const Clinic = require('mongoose').model('Clinic');
const Office = require('mongoose').model('Office');

module.exports = {
    getAll: (req, res) => { 
        Office.find({})
        .sort({date: -1})
        .then(offces => {
            res.json(offces);
        })  
    },

    getById: (req, res) => {
        let id = req.params.id;
        Office.findById(id)
        .then(office => {
            res.json(office);
        })
    },

    create: (req, res) => {
        let newOffice = req.body;
        Office.create(newOffice)
        .then(office => {
            return Clinic.update(
                { },
                { $push: { offices: office._id } }
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
        let newOffice = req.body;
        Office.findByIdAndUpdate({ _id: newOffice._id }, newOffice, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Office.findByIdAndRemove(id)
        .then(office => {
            return Clinic.update(
                { },
                { $pull: { offices: office._id } }
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