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
    var fieldChecked = false;
    var fieldOptions = [];

    // Parse through the object to extract the needed properties
    Object.keys(field).forEach(
      function (key) {

        // Used by select type fields to get an array of selected options
        function prepareSelectValues(options){
          var values = [];
          Object.keys(options).forEach(
            function(key){
              if (options[key]){
                values.push(key);
              }
            }
          );
          return values;
        }

        // Key order is not always guaranteed so check what you got
        if (key !== 'required') {

          // It is name for the field, so use it
          fieldName = key;

          // Handle different data types
          fieldType = getType(field[key]);
          switch (fieldType){
            case 'date':
              // Convert the unix timestamp into something readable
              fieldValue = formatTime(field[key]);
              /**
               /* Using a date type field loses fidelity with the sample data given.
               /*
               /* More advanced logic could determine when to use a date type field
               /* and when to use a regular text field.
               /*
               /* Also in this case the field should probably be readonly.
               /*
               **/
              fieldType = 'text';
              break;
            case 'boolean':
              // Use checked instead of value
              fieldValue = null;
              fieldChecked = field[key];
              break;
            case 'object':
              // Assumes that the properties of the object all have boolean values so will use a select
              // TODO: enhance this to handle cases where the object contains fields with non-boolean values
              fieldType = 'select';
              // Separate the object into an array of options and an array of selected options
              // TODO: Enhance option processing to allow labels and values to be different
              fieldOptions = Object.keys(field[key]);
              fieldValue = prepareSelectValues(field[key]);
//              fieldValue = field[key];
              break;
            default:
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
    field._checked = fieldChecked;
    field._options = fieldOptions;

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

