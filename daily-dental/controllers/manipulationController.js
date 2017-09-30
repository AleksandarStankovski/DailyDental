const Manipulation = require('mongoose').model('Manipulation');

module.exports = {
    getAll: (req, res) => { 
        Manipulation.find({})
        .then(manipulations => {
            res.json(manipulations)
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
        .then(result => {
            res.json('Success');
        }).catch(error => {
            res.status(400).send(error);
        });
    },

    edit: (req, res) => {
        let newManipulation = req.body;
        Manipulation.findById(newManipulation._id)
        .then(manipulation => {
            manipulation.code = newManipulation.code;
            manipulation.name = newManipulation.name;
            manipulation.price = newManipulation.price;
            manipulation.type = newManipulation.type;
            manipulation.save()
            .then(() => {
                res.json('Success');
            }).catch(error => {
                res.status(400).send(error);
            })
        })
    },

    delete: (req, res) => {
        let id = req.params.id;
        Manipulation.findByIdAndRemove(id)
        .then(() => {
            res.json('Success');
        }).catch(error => {
            res.status(400).send(error);
        })
    }
}