/** @jsx React.DOM */
var React = require('react/addons');
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
        <form onSubmit={this.handleSubmit} className="form-horizontal" role="form">
          <input name="id" ref="id" type="hidden" value={config.id}/>
          <FieldList ref="fieldList" fields={config.fields} />
          <input ref="submit" type="submit"></input>
        </form>
      </div>
      );
  }
});

module.exports = Form;
