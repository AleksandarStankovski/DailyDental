const mongoose = require('mongoose');

let clinicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    offices: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Office'
    }],
    manipulations: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Manipulation'
    }],
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Doctor'
    }],
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Patient'
    }]
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
