// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../field.jsx');
describe('Form', function() {

  var React = require('react/addons');
  var Field = require('../field.jsx');
  var TestUtils = React.addons.TestUtils;
  var Data = {
    "id":"00000314159265359",
    "fields":[
      {"firstname":"Tim", "required":true},
      {"lastname":"Cash", "required":true},
      {"email":"tim@oakleon.com", "required":true},
      {"Address":"12345 fake street"},
      {"city": "San Diego"},
      {"state": "CA"},
      {"zipcode": "92119"},
      {"date_created":1392164977880},
      {"tag":"technician"},
      {"tag":"user"},
      {"comment":"This is the first comment about Tim"},
      {"comment":"Here is the second comment about Tim"},
      {"comment":"And a third comment about Tim"},
      {"roles":{
        "sales":false,
        "admin":false,
        "tech":true,
        "manager":true
      }}
    ]
  };

  it('renders', function() {
    var fieldName = 'firstname';
    var fieldValue = 'Todd';
    var component = TestUtils.renderIntoDocument(<Field name={fieldName} label={fieldName} defaultValue={fieldValue}/>);

    expect(component.getDOMNode()).toBeDefined();
  });

  it('generates a label with the field', function(){
    var fieldName = 'firstname';
    var fieldValue = 'Todd';
    var component = TestUtils.renderIntoDocument(<Field name={fieldName} label={fieldName} defaultValue={fieldValue}/>);

    var node = component.refs.firstnameLabel.getDOMNode();
    expect(node).toBeDefined();
    expect(node.textContent).toBe('firstname');

  });

  it('defaults to a text input', function(){
    var fieldName = 'firstname';
    var fieldValue = 'Todd';
    var component = TestUtils.renderIntoDocument(<Field name={fieldName} label={fieldName} defaultValue={fieldValue}/>);

    var node = component.refs.firstnameInput.getDOMNode();
    expect(node.type).toBe('text');
  });

  it('sets the field as required if it has a required property', function(){
    var fieldName = 'firstname';
    var fieldValue = 'Todd';
    var required = true;
    var component = TestUtils.renderIntoDocument(<Field name={fieldName} label={fieldName} defaultValue={fieldValue} required={required}/>);

    var node = component.refs.firstnameInput.getDOMNode();
    expect(node.required).toBe('required');
  });

});
