const mongoose = require('mongoose');
const config = require('../config/config');

let appointmentSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date
    },
    startTime: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    patient: {
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
        }
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' 
    },
    manipulations: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Manipulation' 
    }],
    status: {
        type: String,
        enum: config.development.appointmentStatus,
        require: true
    },
    comment: {
        type: String
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
