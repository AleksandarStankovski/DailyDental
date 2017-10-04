const Patient = require('mongoose').model('Patient');
const Doctor = require('mongoose').model('Doctor');

module.exports = {
    getAll: (req, res) => { 
        Patient.find({})
        .then(patients => {
            res.json(patients);
        })  
    },

    getById: (req, res) => {
        let id = req.params.id;
        Patient.findById(id)
        .then(patient => {
            res.json(patient);
        })
    },

    create: (req, res) => {
        let newPatient = req.body;
        Patient.create(newPatient)
        .then(patient => {
            return Doctor.update(
                { _id: patient.doctor },
                { $push: { patients: patient._id } }
            )
        })
        .then(result => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        });
    },

    edit: (req, res) => {
        let newPatient = req.body;
        Patient.findById(newPatient._id)
        .then(patient => {
            let oldDoctor = patient.doctor;
            patient.firstName = newPatient.firstName;
            patient.lastName = newPatient.lastName;
            patient.phone = newPatient.phone;
            patient.address = newPatient.address;
            patient.email = newPatient.email;
            patient.doctor = newPatient.doctor;
            // patient.save()
            // .then(result => {
            //     if(oldDoctor !== result.doctor) {
            //         Doctor.update(
            //             { _id: oldDoctor },
            //             { $pull: { patients: result._id } }
            //         ).then(() => {
            //             Doctor.update(
            //                 { _id: result.doctor },
            //                 { $push: { patients: result._id } }
            //             ).then(() => {
            //                 res.json('Success');
            //             })
            //         }) 
            //     } else {
            //         res.json('Success');
            //     }
            // })
            return new Promise((resolve, reject) => {
                patient.save()
                .then(result => {
                    let obj = {
                        patientId: result._id,
                        doctor: result.doctor,
                        oldDoctor: oldDoctor
                    }
                    resolve(obj);
                })
                .catch(error => {
                    reject(error);
                })
            });
        })
        .then(result => {
            return new Promise((resolve, reject) => {
                if(result.oldDoctor !== result.doctor) {
                    Doctor.update(
                        { _id: result.oldDoctor },
                        { $pull: { patients: result.patientId } }
                    )
                    .then(() => {
                        resolve(result);
                    })
                    .catch(error => {
                        reject(error);
                    })
                } else {
                    resolve(result);
                }
            });
        })
        .then(result => {
            return new Promise((resolve, reject) => {
                if(result.oldDoctor !== result.doctor) {
                    Doctor.update(
                        { _id: result.doctor },
                        { $push: { patients: result.patientId } }
                    )
                    .then(() => {
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    })
                } else {
                    resolve();
                }
            })
        })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })

    },

    delete: (req, res) => {
        let id = req.params.id;
        Patient.findByIdAndRemove(id)
        .then(patient => {
            return Doctor.update(
                { _id: patient.doctor },
                { $pull: { patients: patient._id } }
            )
        })
        .then(result => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    }
}