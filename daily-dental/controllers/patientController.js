let patients = [
    {
        code: '1000',
        firstName: 'Пациент 1',
        lastName: 'Пациент 1 фамилия',
        phone: '0876141091',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        _id: '451521'
    },
    {
        code: '1000',
        firstName: 'Пациент 2',
        lastName: 'Пациент 2 фамилия',
        phone: '0876141091',
        address: 'София, Перник 90',
        email: 'test@tes.com',
        _id: '451521'
    }
]

module.exports = {
    getAll: (req, res) => { 
        res.json(patients)
    },

    getById: (req, res) => {
        let patientId = req.params.id;
        let patient = patients.find(x => x._id === patientId);
        res.json(patient);
    },

    create: (req, res) => {
        let newPatient = req.body;
        res.json(newPatient);
    },

    edit: (req, res) => {
        let newPatient = req.body;
        res.json(newPatient);
    },

    delete: (req, res) => {
        let patientId = req.params.id;
        res.json(patients);
    }
}