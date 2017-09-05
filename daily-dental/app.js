const express = require('express');
const config = require('./config/config');
const app = express();

let env = 'development';
require('./config/express')(app, config[env]);
require('./config/routes')(app, config[env]);

app.listen(config[env].port, function() {
  console.log('Port ' + config[env].port);
})

module.exports = app;
