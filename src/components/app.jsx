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
  prepareField: function(field, parent){
    //TODO:
    //dedup
    var fieldName = '';
    var fieldValue = '';
    var fieldType = 'text';
    var fieldRequired = false;
    var fieldChecked = false;

    // Parse through the object to extract the needed properties
    Object.keys(field).forEach(
      function (key) {
        // Key order is not always guaranteed so check what you got
        if (key !== 'required') {
          fieldName = key;
          fieldType = getType(field[key]);
          switch (fieldType){
            case 'date':
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
              fieldValue = null;
              fieldChecked = field[key];
              break;
//            case 'object':
//              return this.prepareField(field, key);
//              break;
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

