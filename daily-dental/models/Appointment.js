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
        _id: {
            type: mongoose.Schema.Types.ObjectId,
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
        middleName: {
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
        ref: 'Doctor',
        required: true 
    },
    status: {
        name: {
            type: String,
            require: true
        },
        value: {
            type: String,
            require: true
        },
        color: {
            type: String
        },
        icon: {
            type: String
        }
    },
    comment: {
        type: String
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
