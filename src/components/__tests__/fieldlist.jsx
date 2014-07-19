// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../fieldlist.jsx');
describe('Form', function() {

  var React = require('react/addons');
  var FieldList = require('../fieldlist.jsx');
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
        {"firstname":"Todd", "required":true}
      ]
    };
    var component = TestUtils.renderIntoDocument(<FieldList fields={Data.fields} />);

    expect(component.getDOMNode()).toBeDefined();
  });

  it('generates a field for each field object in the field array', function(){
    var Data = {
      "id":"123",
      "fields":[
        {"firstname":"Todd", "required":true},
        {"lastname":"Bashor"}
      ]
    };
    var component = TestUtils.renderIntoDocument(<FieldList fields={Data.fields} />);
    var field1 = component.refs.firstname.getDOMNode();
    expect(field1).toBeDefined();
    expect(field1.name).toBe('firstname');
    expect(field1.value).toBe('Todd');
    var field2 = component.refs.lastname.getDOMNode();
    expect(field2).toBeDefined();
    expect(field2.name).toBe('lastname');
    expect(field2.value).toBe('Bashor');
  });

  xit('generates a submit button', function(){
//    var Data = {
//      "id":"123",
//      "fields":[
//      ]
//    };
//    var component = TestUtils.renderIntoDocument(<Form config={Data} />);
//    var submit = component.refs.submit.getDOMNode();
//    expect(submit).toBeDefined();
//    expect(submit.type).toBe('submit');
  });
});