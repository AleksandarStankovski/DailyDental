let manipulations = [
    {
        code: '1000',
        name: 'Вадене на зъб',
        price: 240,
        type: 'aesthetic',
         _id: '1',
    },
    {
        code: '1001',
        name: 'Вадене на зъб 2',
        price: 180,
        type: 'parodontology',
        _id: '2'
    },
    {
        code: '1002',
        name: 'Вадене на зъб 3',
        price: 120,
        type: 'pediatrics',
        _id: '3'
    },
    {
        code: '1003',
        name: 'Вадене на зъб',
        price: 340,
        type: 'endodontics',
         _id: '4',
    },
    {
        code: '1004',
        name: 'Вадене на зъб 2',
        price: 250,
        type: 'orthodontics',
        _id: '5'
    },
    {
        code: '1005',
        name: 'Вадене на зъб 3',
        price: 160,
        type: 'surgery',
        _id: '6'
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