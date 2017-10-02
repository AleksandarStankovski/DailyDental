const path = require('path');

module.exports = {
    development: {
        port: 3000,
        rootFolder: path.normalize(path.join(__dirname, '/../')),
        connectionString: 'mongodb://localhost:27017/dailyDental',
        specialityType: ['aesthetic', 'parodontology', 'pediatrics', 'endodontics', 'orthodontics', 'surgery']
    }
};
