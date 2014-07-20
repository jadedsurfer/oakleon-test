// src/components/fieldlist.jsx

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
//  cleanUpFields: function(fields){
//    //TODO: clean up initial input
//    //dedup
//    var cleanFields = fields.map(function(field){
//      var fieldName, fieldValue, fieldType;
//      for (var key in Object.keys(field)){
//        if (key !== 'required') {
//          fieldName = key;
//          fieldValue = field[key];
//          fieldType = this.getFieldType(field.value);
//        }
//      }
//      field._name = fieldName;
//      field._value = fieldValue;
//      field._type = fieldType;
//      return field;
//    );
//
//    return fields;
//  },
//  getFieldType: function(value){
//    var type = 'text';
//
//    switch (typeof value) {
//      case 'undefined':
//        type='text';
//        break;
//      case 'object':
//        if (value === null){
//          type='text'
//        } else {
//          type = 'object';
//        }
//        break;
//      case 'boolean':
//        type='boolean';
//        break;
//      case 'number':
//        type='number';
//        break;
//      case 'string':
//        type='text';
//        break;
//      case 'symbol':
//        type='error';
//        break;
//      case 'function':
//        type='error';
//        break;
//      default:
//        type='text'
//    }
//    return type;
//  },

  render: function() {
    var fields = this.state.fields;

    if (fields.length > 0 && fields !== 'undefined') {

      var fieldsToRender = fields.map(function(field){
//      for (var key in field){
//        if (key !== 'required' && field.hasOwnProperty(key)) {
//          fieldName = key;
//          fieldValue = field[key];
//          fieldType = this.getFieldType(fieldValue);
//        }
//      }

        return (
          <Field config={field} ref={field._name} />
          );
      });
    }

    return (
      <div>
       {fieldsToRender}
      </div>
     );
  }
});

module.exports = FieldList;
