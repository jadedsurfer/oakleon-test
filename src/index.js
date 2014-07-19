/** @jsx React.DOM */
(function(){
  'use strict';

  var React = require('react/addons');
  //var App = require('./components/app.jsx');
  var Form = require('./components/form.jsx');
  var Data = require('../data');

  function render(){
    React.renderComponent(
      <Form config={Data} />,
      document.getElementById('app')
    );
  }


  //model.subscribe(render);

  render();
})();