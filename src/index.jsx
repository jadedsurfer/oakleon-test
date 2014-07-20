// src/index.js

/** @jsx React.DOM */
(function(){

  var React = require('react/addons');
  //var App = require('./components/app.jsx');
  var Form = require('./components/form.jsx');
  var Data = require('../data');

  function getConfig(){
    return prepareConfig(Data);
  }

  function prepareConfig(config){
    //TODO:
    //dedup
    //convert date values

    var cleanConfig = {};
    var fields = config.fields;

    cleanConfig.id = config.id;

    cleanConfig.fields = fields.map(function(field) {
      var fieldName = '';
      var fieldValue = '';
      var fieldType = 'text';
      var fieldRequired = false;

      // Parse through the object to extract the needed properties
      Object.keys(field).forEach(function(key){
        if (key !== 'required') {
          fieldName = key;
          fieldValue = field[key];
          fieldType = getFieldType(fieldValue);
        }
        if (key === 'required') {
          fieldRequired = field[key];
        }
      });

      // Add metadata to the original field
      field._name = fieldName;
      field._label = fieldName;
      field._value = fieldValue;
      field._type = fieldType;
      field._required = fieldRequired;

      return field;
    });

    return cleanConfig;
  }

  function getFieldType(value){
    var type = 'text';

    switch (typeof value) {
      case 'undefined':
        type='text';
        break;
      case 'object':
        if (value === null){
          type='text'
        } else {
          type = 'object';
        }
        break;
      case 'boolean':
        type='boolean';
        break;
      case 'number':
        type='number';
        break;
      case 'string':
        type='text';
        break;
      case 'symbol':
        type='error';
        break;
      case 'function':
        type='error';
        break;
      default:
        type='text';
    }
    return type;
  }

  function render(config){
    React.renderComponent(
      <Form config={config} />,
      document.getElementById('app')
    );
  }

  render(getConfig(Data));
})();