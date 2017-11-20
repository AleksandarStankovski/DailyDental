const mongoose = require('mongoose');
const config = require('../config/config');

let manipulationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    speciality: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        color: {
            type: String
        },
        icon: {
            type: String
        }
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
});

const Manipulation = mongoose.model('Manipulation', manipulationSchema);

module.exports = Manipulation;
