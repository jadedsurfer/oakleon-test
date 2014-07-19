// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../form.jsx');
describe('Form', function() {

  var React = require('react/addons');
  var Form = require('../form.jsx');
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
    var Data = {
      "id":"123",
      "fields":[
      ]
    };
    var form = TestUtils.renderIntoDocument(<Form config={Data} />);

    expect(form.getDOMNode()).toBeDefined();
  });

  it('generates a hidden field for "id"', function(){
    var Data = {
      "id":"123",
      "fields":[
      ]
    };
    var component = TestUtils.renderIntoDocument(<Form config={Data} />);
    var id = component.refs.id.getDOMNode();
    expect(id).toBeDefined();
    expect(id.type).toBe('hidden');
    expect(id.name).toBe('id');
    expect(id.value).toBe('123');
  });

  it('generates a submit button', function(){
    var Data = {
      "id":"123",
      "fields":[
      ]
    };
    var component = TestUtils.renderIntoDocument(<Form config={Data} />);
    var submit = component.refs.submit.getDOMNode();
    expect(submit).toBeDefined();
    expect(submit.type).toBe('submit');
  });
});
