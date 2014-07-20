// src/components/app.js

/** @jsx React.DOM */
var React = require('react/addons');
var Form = require('./form.jsx');
var utils = require('./utils');
var getType = utils.getType;
var formatTime = utils.formatTime;

var App = {
  init: function(config){
    this.getConfig(config);
    return this.render();
  },
  getConfig: function (config) {
    this.config = this.prepareConfig(config);
  },
  prepareConfig: function (config) {
    var cleanConfig = {};
    var fields = config.fields;

    cleanConfig.id = config.id;

    cleanConfig.fields = fields.map(this.prepareField);

    return cleanConfig;
  },
  prepareField: function(field){
    //TODO:
    //dedup
    var fieldName = '';
    var fieldValue = '';
    var fieldType = 'text';
    var fieldRequired = false;

    // Parse through the object to extract the needed properties
    Object.keys(field).forEach(
      function (key) {
        if (key !== 'required') {
          fieldName = key;
          fieldType = getType(field[key]);
          if (fieldType === 'date') {
            fieldValue = formatTime(field[key]);
            fieldType = 'text';
          } else {
            fieldValue = field[key];
          }
        }

        if (key === 'required') {
          fieldRequired = field[key];
        }

      }
    );

    // Add metadata to the original field
    field._name = fieldName;
    field._label = fieldName;
    field._value = fieldValue;
    field._type = fieldType;
    field._required = fieldRequired;

    return field;
  },
  render: function(){
    var config = this.config;
    React.renderComponent(
      <Form config={config} />,
      document.getElementById('app')
    );
  }
};

module.exports = App;

