const mongoose = require('mongoose');
const config = require('../config/config');

let doctorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    egn: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        enum: config.development.specialityType,
        required: true
    },
    patients: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
