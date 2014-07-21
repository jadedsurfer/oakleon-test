// src/components/app.jsx

/** @jsx React.DOM */
var React = require('react/addons');
var processConfig = require('./process-config');
var Form = require('./form.jsx');

var App = {
  init: function(config){
    // Use the configProcessor to make subsequent use of the input easier
    var processedConfig = processConfig(config);
    return this.render(processedConfig);
  },
  render: function(config){
    React.renderComponent(
      <Form config={config} />,
      document.getElementById('app')
    );
  }
};

module.exports = App;

