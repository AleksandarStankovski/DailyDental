let offices = [
    {
        code: '1000',
        phone: '0876141091',
        type: 'aesthetic',
        _id: '1'
    },
    {
        code: '1001',
        phone: '0876141091',
        type: 'parodontology',
        _id: '2'
    },
    {
        code: '1000',
        phone: '0876141091',
        type: 'pediatrics',
        _id: '3'
    },
    {
        code: '1001',
        phone: '0876141091',
        type: 'endodontics',
        _id: '4'
    },
    {
        code: '1001',
        phone: '0876141091',
        type: 'orthodontics',
        _id: '5'
    },
    {
        code: '1000',
        phone: '0876141091',
        type: 'surgery',
        _id: '6'
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