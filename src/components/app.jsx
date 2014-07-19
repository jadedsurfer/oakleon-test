// src/app.js


//var Model = require('./components/model.jsx');
//var hello = require('./components/hello.jsx');
//
//React.renderComponent(hello({name: 'World'}), document.getElementById('app'));

//var model = new Model();

/** @jsx React.DOM */
var React = require('react/addons');
var App = React.createClass({
  getInitialState: function(){
    return {
      name: ''
    };
  },
  componentDidMount: function(){
    //making a change

  },
  save: function(dataToSave){

  },
  cancel: function(){

  },
  render: function(){
    return <div class="app">Hello {this.props.name}</div>;
  }
});

module.exports = App;

