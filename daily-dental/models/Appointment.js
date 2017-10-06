const mongoose = require('mongoose');
const config = require('../config/config');

let appointmentSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
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
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' 
    },
    manipulations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Manipulation' 
    }

});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
