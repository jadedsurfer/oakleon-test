/** @jsx React.DOM */
var React = require('react/addons');
var Button = require('react-bootstrap').Button;
var FieldList = require('./fieldlist.jsx');
var Form = React.createClass({
  getInitialState: function() {
    return {
      config: {}
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    var config = this.props.config;
    return (
      <div>
        <h1>Oakleon Generated Form</h1>
        <form onSubmit={this.handleSubmit} className="form-horizontal col-xs-6" role="form">
          <input name="id" ref="id" type="hidden" value={config.id}/>
          <FieldList ref="fieldList" fields={config.fields} />
          <Button bsStyle="primary" ref="submit" type="submit">Primary</Button>
        </form>
      </div>
      );
  }
});

module.exports = Form;
