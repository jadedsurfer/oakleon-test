// src/components/app.js

/** @jsx React.DOM */
var React = require('react/addons');
var Form = require('./form.jsx');
var getType = require('./utils').getType;
var formatTime = require('./utils').formatTime;

var App = {
  init: function(config){
    this.getConfig(config);
    return this.render();
  },
  getConfig: function (config) {
    this.config = this.prepareConfig(config);
  },
  prepareConfig: function (config) {
    //TODO:
    //dedup

    var cleanConfig = {};
    var fields = config.fields;

    cleanConfig.id = config.id;

    cleanConfig.fields = fields.map(function (field) {
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
            if (fieldType === 'number' && field[key].toString().length === 13) {
              fieldValue = formatTime(field[key]);
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
    });

    return cleanConfig;
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

