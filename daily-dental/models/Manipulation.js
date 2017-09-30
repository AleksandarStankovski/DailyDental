const mongoose = require('mongoose');

let manipulationSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['aesthetic', 'parodontology', 'pediatrics', 'endodontics', 'orthodontics', 'surgery'],
        required: true
    }

});

const Manipulation = mongoose.model('Manipulation', manipulationSchema);

module.exports = Manipulation;
