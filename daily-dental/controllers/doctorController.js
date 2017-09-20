let doctors = [
    {
        code: '1000',
        firstName: 'Лидия',
        lastName: 'Ситновска',
        egn: '254871157',
        phone: '0876141091',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        email: 'Хирургия',
        active: true,
        _id: '451521'
    },
    {
        code: '1001',
        firstName: 'Александар',
        lastName: 'Станковски',
        egn: '254871157',
        phone: '0876141092',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        email: 'Хирургия',
        active: true,
        _id: '1224354'
    }
]

module.exports = {
    getAll: (req, res) => { 
        res.json(doctors)
    },

    getById: (req, res) => {
        let doctorId = req.params.id;
        let doctor = doctors.find(x => x._id === doctorId);
        res.json(doctor);
    },

    create: (req, res) => {
        let newDoctor = req.body;
        res.json(newDoctor);
    },

    edit: (req, res) => {
        let newDoctor = req.body;
        res.json(newDoctor);
    },

    delete: (req, res) => {
        let doctorId = req.params.id;
        res.json(doctors);
    }
}