let clinics = [
    {
        code: '1000',
        name: 'Virtue',
        phone: '0876141091',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        _id: '451521'
    }
]

module.exports = {
    getAll: (req, res) => { 
        res.json(clinics)
    },

    getById: (req, res) => {
        let clinicId = req.params.id;
        let clinic = clinics.find(x => x._id === clinicId);
        res.json(clinic);
    },

    create: (req, res) => {
        let newClinic = req.body;
        res.json(newClinic);
    },

    edit: (req, res) => {
        let newClinic = req.body;
        res.json(newClinic);
    }
}