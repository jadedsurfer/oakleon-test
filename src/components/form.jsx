// src/components/form.jsx

/** @jsx React.DOM */
var React = require('react/addons');
var Button = require('react-bootstrap').Button;
var Field = require('./field.jsx');

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
    var fields = config.fields;
    var fieldsToRender = [];

    if (fields.length > 0 && fields !== 'undefined'){
      fieldsToRender = fields.map(function(field){
        return <Field config={field} ref={field._name} key={field._name}/>;
      });
    }
    return (
      <div>
        <h1>Oakleon Generated Form</h1>
        <form onSubmit={this.handleSubmit} className="form-horizontal col-xs-6" role="form">
          <input name="id" ref="id" type="hidden" value={config.id}/>
          {fieldsToRender}
          <Button bsStyle="primary" ref="submit" type="submit">Primary</Button>
        </form>
      </div>
      );
  }
});

module.exports = Form;