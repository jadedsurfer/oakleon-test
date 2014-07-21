// src/components/form.jsx

/** @jsx React.DOM */
var React = require('react/addons');
var Button = require('react-bootstrap').Button;
var Field = require('./field.jsx');
//var FieldList = require('./fieldlist.jsx');
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

//var values = config.value;
//var name = config.name;
//var fieldsToRender = [];
//
//
//
//for (var i=0; i < values.length; i++){
//  var newConfig = Object.create(config);
//  newConfig.value = values[i];
//  newConfig.name = name + '[' + i + ']';
//  newConfig.key = name + '[' + i + ']';
//  newConfig.onChange = null;
//  if (i > 0){
//    newConfig.label = ' ';
//  }
//  fieldsToRender.push(this.renderInput(newConfig));
//}
//return (
//  <div>
//      {fieldsToRender}
//  </div>
//  );