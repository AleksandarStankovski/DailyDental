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
    type: {
        type: String,
        enum: config.development.specialityType,
        required: true
    }
});

const Manipulation = mongoose.model('Manipulation', manipulationSchema);

module.exports = Manipulation;
