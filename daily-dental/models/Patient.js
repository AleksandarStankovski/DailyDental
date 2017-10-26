const mongoose = require('mongoose');
const config = require('../config/config');

let patientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor' 
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
