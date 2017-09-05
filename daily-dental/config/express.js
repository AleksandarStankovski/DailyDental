const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = function (app, config) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(express.static(path.join(config.rootFolder, 'dist')));
};
