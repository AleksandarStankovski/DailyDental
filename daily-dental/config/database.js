const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function (config) {
    mongoose.connect(config.connectionString);

    mongoose.connection.once('open', function (error) {
        if (error) {
        console.log(error);
        return;
        }
        console.log('MongoDB ready');
    })

    require('./../models/Clinic');
    require('./../models/Doctor');
    require('./../models/Manipulation');
    require('./../models/Patient');
    require('./../models/Appointment');
};
