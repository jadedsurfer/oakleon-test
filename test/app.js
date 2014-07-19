// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../src/components/app.jsx');
describe('App', function() {
  it('renders', function() {
    var React = require('react/addons');
    var App = require('../src/components/app.jsx');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var app = TestUtils.renderIntoDocument(
      <App name="test"/>
    );

    expect(label.getDOMNode().textContent).toEqual('Hello test');
  });
});
