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

    var node = TestUtils.findRenderedDOMComponentWithTag(component, 'label').getDOMNode();
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

    var node = TestUtils.findRenderedDOMComponentWithTag(component, 'input').getDOMNode();
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

    var node = TestUtils.findRenderedDOMComponentWithTag(component, 'input').getDOMNode();
    expect(node.required).toBeTruthy();
  });

  it('generates a checkbox field for booleans', function(){
    var config = {
      "_name": "admin",
      "_label": "admin",
      "_checked": true,
      "_type": "boolean",
      "_required": false
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);

    var node = TestUtils.findRenderedDOMComponentWithTag(component, 'input').getDOMNode();
    expect(node.type).toBe('checkbox');
  });

  it('generates a multiple selection widget for fields with an object type', function(){
    var config = {
      "_name": "roles",
      "_label": "roles",
      "_value": ["sales", "admin"],
      "_options": ["sales", "admin"],
      "_type": "select",
      "_required": false
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);
    expect(component.state.value).toEqual(['sales', "admin"]);

    var node = TestUtils.findRenderedDOMComponentWithTag(component, 'select').getDOMNode();
    expect(node.type).toBe('select-multiple');

  });

  // TODO: Get this to work; Can't figure out how to test it properly since I had to hack the component
  xit('saves state correctly for multiple selections', function(){
    var config = {
      "_name": "roles",
      "_label": "roles",
      "_value": ["sales", "admin"],
      "_options": ["sales", "admin", "qa"],
      "_type": "select",
      "_required": false
    };
    var component = TestUtils.renderIntoDocument(<Field config={config}/>);
    var node = TestUtils.findRenderedDOMComponentWithTag(component, 'select').getDOMNode();

    TestUtils.Simulate.change(node, {value: ["sales", "qa"]});
    expect(component.state.value).toEqual(['sales', "qa"]);

  });

});
