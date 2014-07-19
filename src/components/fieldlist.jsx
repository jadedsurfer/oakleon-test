/** @jsx React.DOM */
var React = require('react/addons');
var Field = require('./field.jsx');
var FieldList = React.createClass({
  getInitialState: function() {
    return {
      fields: []
    };
  },
  render: function() {
    var fieldData = this.props.fields;
    var fieldsToRender = fieldData.map(function(field){
      var fieldName = '';
      var fieldValue = null;
      for (var key in field) {
        if (key !== 'required' && field.hasOwnProperty(key)) {
          fieldName = key;
          fieldValue = field[key];
        }
      }
      return (
        <Field ref={fieldName} name={fieldName} defaultValue={fieldValue}/>
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
