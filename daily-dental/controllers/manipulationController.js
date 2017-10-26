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
        let page = req.params.page || 1
        let perPage = 6;
        Manipulation.find({}).count().then(function (count) {
            let countPage = Math.ceil(count / perPage);
            Manipulation.find({})
            .skip(perPage * (page - 1))
            .limit(perPage)
            .then(manipulations => {
                res.json({countPage: countPage, manipulations: manipulations});
            })
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