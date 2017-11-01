const mongoose = require('mongoose');
const config = require('../config/config');

let examinationSchema = mongoose.Schema({
    procedures: [
        {
            tooth: {
                type: String
            },
            manipulations: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId
                    },
                    name: {
                        type: String
                    },
                    price: {
                        type: Number
                    }
                }
            ]
        }
    ],
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        require: true 
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
});

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = Examination;
