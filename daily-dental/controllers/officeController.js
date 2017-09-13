let offices = [
    {
        code: '1000',
        phone: '0876141091',
        color: '#fff',
        _id: '4853412'
    },
    {
        code: '1001',
        phone: '0876141091',
        color: '#fff',
        _id: '786451'
    }
]

module.exports = {
    getAll: (req, res) => { 
        res.json(offices)
    },

    getById: (req, res) => {
        let officeId = req.params.id;
        let office = offices.find(x => x._id === officeId);
        res.json(office);
    },

    create: (req, res) => {
        let newOffice = req.body;
        res.json(newOffice);
    },

    edit: (req, res) => {
        let newOffice = req.body;
        res.json(newOffice);
    },

    delete: (req, res) => {
        let officeId = req.params.id;
        res.json(offices);
    }
}