// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../field.jsx');
describe('Form', function() {

  var React = require('react/addons');
  var Field = require('../field.jsx');
  var TestUtils = React.addons.TestUtils;

  it('renders', function() {
    var config = {
      "_name": "firstname",
      "_label": "firstname",
      "_value": "Todd",
      "_type": "text",
      "_required": false
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);

    expect(component.getDOMNode()).toBeDefined();
  });

  it('generates a label with the field', function(){
    var config = {
      "_name": "firstname",
      "_label": "firstname",
      "_value": "Todd",
      "_type": "text",
      "_required": false
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);

    var node = component.refs.firstnameLabel.getDOMNode();
    expect(node).toBeDefined();
    expect(node.textContent).toBe('firstname');

  });

  it('defaults to a text input', function(){
    var config = {
      "_name": "firstname",
      "_label": "firstname",
      "_value": "Todd",
      "_type": "text",
      "_required": false
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);

    var node = component.refs.firstnameInput.getDOMNode();
    expect(node.type).toBe('text');
  });

  it('sets the field as required if it has a required property', function(){
    var config = {
      "_name": "firstname",
      "_label": "firstname",
      "_value": "Todd",
      "_type": "text",
      "_required": true
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);

    var node = component.refs.firstnameInput.getDOMNode();
    expect(node.required).toBe('required');
  });

  it('generates a checkbox field for booleans', function(){
    var config = {
      "_name": "admin",
      "_label": "admin",
      "_value": true,
      "_type": "boolean",
      "_required": false
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);

    var node = component.refs.adminInput.getDOMNode();
    expect(node.type).toBe('checkbox');
  });

});
