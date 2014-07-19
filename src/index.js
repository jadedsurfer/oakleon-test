/** @jsx React.DOM */
(function(){
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