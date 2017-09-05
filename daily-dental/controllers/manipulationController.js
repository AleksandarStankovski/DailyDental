let manipulations = [
    {
        _id: '451521',
        code: '1000',
        name: 'Вадене на зъб',
        price: 100,
        currency: 'BGN'
    },
    {
        _id: '414612',
        code: '1001',
        name: 'Вадене на зъб 2',
        price: 101,
        currency: 'BGN'
    },
    {
        _id: '784545',
        code: '1002',
        name: 'Вадене на зъб 3',
        price: 102,
        currency: 'BGN'
    }
]

module.exports = {
    getAll: (req, res) => { 
        res.json(manipulations)
    },

    getById: (req, res) => {
        let manipulationId = req.params.id;
        let manipulation = manipulations.find(x => x._id === manipulationId);
        res.json(manipulation);
    },

    create: (req, res) => {
        let newManipulation = req.body;
        res.json(newManipulation);
    },

    edit: (req, res) => {
        let newManipulation = req.body;
        res.json(newManipulation);
    },

    delete: (req, res) => {
        let manipulationId = req.params.id;
        res.json(manipulations);
    }
}