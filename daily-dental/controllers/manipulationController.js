const Clinic = require('mongoose').model('Clinic');
const Manipulation = require('mongoose').model('Manipulation');

module.exports = {
    getAll: (req, res) => { 
        Manipulation.find({})
        .then(manipulations => {
            res.json(manipulations);
        })
    },

    getByPage: function (req, res) {
        let currentPage = Number(req.query.currentPage) || 1;
        let itemsPerPage = Number(req.query.itemsPerPage) || 18;
        Manipulation.find({}).count().then(function (manipulationsLength) {
            let countPage = Math.ceil(manipulationsLength / itemsPerPage);
            Manipulation.find({})
            .skip(itemsPerPage * (currentPage - 1))
            .limit(itemsPerPage)
            .then(manipulations => {
                res.json({countPage: countPage, manipulations: manipulations, manipulationsLength: manipulationsLength});
            })
        })
    },

    getFiltered: (req, res) => { 
        let searchText = new RegExp(req.query.searchText, 'i'); 
        Manipulation.find({ $or: [{ name: { $regex: searchText }}, { type: { $regex: searchText }}] })
        .then(manipulations => {
            res.json(manipulations);
        })
    },

    getById: (req, res) => {
        let id = req.params.id;
        Manipulation.findById(id)
        .then(manipulation => {
            res.json(manipulation);
        })
    },

    create: (req, res) => {
        let newManipulation = req.body;
        Manipulation.create(newManipulation)
        .then(manipulation => {
            return Clinic.update(
                { },
                { $push: { manipulations: manipulation._id } }
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
        let newManipulation = req.body;
        Manipulation.findByIdAndUpdate({ _id: newManipulation._id }, newManipulation, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Manipulation.findByIdAndRemove(id)
        .then(manipulation => {
            return Clinic.update(
                { },
                { $pull: { manipulations: manipulation._id } }
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