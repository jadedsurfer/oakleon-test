/** @jsx React.DOM */
var React = require('react/addons');
var Field = require('./field.jsx');
var FieldList = React.createClass({
  getInitialState: function() {
    return {
      fields: []
    };
  },
  componentDidMount: function(){
    this.setState({
      fields: this.props.fields
    });
  },
  render: function() {
    var fieldData = this.state.fields;
    var fieldsToRender = fieldData.map(function(field){

      var fieldName = '';
      var fieldValue = null;
      var required = null;

      for (var key in field) {
        if (key !== 'required' && field.hasOwnProperty(key)) {
          fieldName = key;
          fieldValue = field[key];
        }

        if (key === 'required' && field.hasOwnProperty(key)) {
          required = field[key];
        }

      }
      return (
        <Field ref={fieldName} name={fieldName} label={fieldName} defaultValue={fieldValue}/>
      );
    });



    return (
      <div>
        <h3>Field List</h3>
        {fieldsToRender}
      </div>

     );
  }
});

module.exports = FieldList;
