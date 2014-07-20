// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../form.jsx');
describe('Form', function() {

  var React = require('react/addons');
  var Form = require('../form.jsx');
  var TestUtils = React.addons.TestUtils;

  it('renders', function() {
    var config = {
      "id":"123",
      "fields":[
      ]
    };
    var form = TestUtils.renderIntoDocument(<Form config={config} />);

    expect(form.getDOMNode()).toBeDefined();
  });

  it('generates a hidden field for "id"', function(){
    var config = {
      "id":"123",
      "fields":[
      ]
    };
    var component = TestUtils.renderIntoDocument(<Form config={config} />);
    var id = component.refs.id.getDOMNode();
    expect(id).toBeDefined();
    expect(id.type).toBe('hidden');
    expect(id.name).toBe('id');
    expect(id.value).toBe('123');
  });

  it('generates a submit button', function(){
    var config = {
      "id":"123",
      "fields":[
      ]
    };
    var component = TestUtils.renderIntoDocument(<Form config={config} />);
    var submit = component.refs.submit.getDOMNode();
    expect(submit).toBeDefined();
    expect(submit.type).toBe('submit');
  });
});
