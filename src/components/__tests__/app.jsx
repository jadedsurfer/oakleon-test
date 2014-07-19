// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../app.jsx');
describe('App', function() {
  it('renders', function() {
    var React = require('react/addons');
    var App = require('../app.jsx');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var app = TestUtils.renderIntoDocument(
      <App name="test"/>
    );

    expect(app.getDOMNode().textContent).toEqual('Hello test');
  });
});
