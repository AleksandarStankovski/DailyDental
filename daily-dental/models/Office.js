const mongoose = require('mongoose');
const config = require('../config/config');

let officeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
});

const Office = mongoose.model('Office', officeSchema);

module.exports = Office;
