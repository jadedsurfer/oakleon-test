// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../fieldlist.jsx');
describe('Form', function() {

  var React = require('react/addons');
  var FieldList = require('../fieldlist.jsx');
  var TestUtils = React.addons.TestUtils;

  it('renders', function() {
    var config = {
      "id":"123",
      "fields":[
        {
          "_name": "firstname",
          "_label": "firstname",
          "_value": "Todd",
          "_type": "text",
          "_required": true
        }
      ]
    };
    var component = TestUtils.renderIntoDocument(<FieldList fields={config.fields} />);

    expect(component.getDOMNode()).toBeDefined();
  });

  it('generates a field for each fields object in the field array', function(){
    var config = {
      "id":"123",
      "fields":[
        {
          "_name": "firstname",
          "_label": "firstname",
          "_value": "Todd",
          "_type": "text",
          "_required": true
        },
        {
          "_name": "lastname",
          "_label": "lastname",
          "_value": "Bashor",
          "_type": "text",
          "_required": false
        }
      ]
    };
    var component = TestUtils.renderIntoDocument(<FieldList fields={config.fields} />);
    var field1 = component.refs.firstname;
    expect(field1).toBeDefined();

    var field2 = component.refs.lastname;
    expect(field2).toBeDefined();
  });

});
