// src/index.js

(function () {
  'use strict';

  var App = require('./components/app.jsx');
  // TODO: have the app pull the config from the server
  var Data = require('../data');

  App.init(Data);
})();