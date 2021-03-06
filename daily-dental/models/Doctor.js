const mongoose = require('mongoose');
const config = require('../config/config');
const encryption = require('../utilities/encryption');

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
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    speciality: {
        name: {
            type: String,
        },
        value: {
            type: String,
        },
        color: {
            type: String
        },
        doctorImage: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String, 
        required: true
    },
    salt: { 
        type: String,
        required: true
    },
    role: { 
        type: String,
        enum: ['admin', 'user', 'reception'],
        required: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Appointment' 
    }],
    active: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
},{
    versionKey: false
});

doctorSchema.method ({
    authenticate: function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt);
        let isSamePasswordHash = inputPasswordHash === this.passwordHash;

        return isSamePasswordHash;
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
