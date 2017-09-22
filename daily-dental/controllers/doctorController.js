let doctors = [
    {
        code: '1000',
        firstName: 'Лидия',
        lastName: 'Ситновска',
        egn: '254871157',
        phone: '0876141091',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        speciality: 'aesthetic',
        active: true,
        _id: '1'
    },
    {
        code: '1001',
        firstName: 'Александар',
        lastName: 'Станковски',
        egn: '254871157',
        phone: '0876141092',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        speciality: 'parodontology',
        active: true,
        _id: '2'
    },
    {
        code: '1000',
        firstName: 'Лидия',
        lastName: 'Ситновска',
        egn: '254871157',
        phone: '0876141091',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        speciality: 'pediatrics',
        active: true,
        _id: '3'
    },
    {
        code: '1001',
        firstName: 'Александар',
        lastName: 'Станковски',
        egn: '254871157',
        phone: '0876141092',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        speciality: 'endodontics',
        active: true,
        _id: '4'
    },
    {
        code: '1000',
        firstName: 'Лидия',
        lastName: 'Ситновска',
        egn: '254871157',
        phone: '0876141091',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        speciality: 'orthodontics',
        active: true,
        _id: '5'
    },
    {
        code: '1001',
        firstName: 'Александар',
        lastName: 'Станковски',
        egn: '254871157',
        phone: '0876141092',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        speciality: 'surgery',
        active: true,
        _id: '6'
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