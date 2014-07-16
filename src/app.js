var React = require('react');
var hello = require('./components/hello.jsx');

React.renderComponent(hello({name: 'World'}), document.getElementById('app'));