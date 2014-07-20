// src/components/field.jsx

/** @jsx React.DOM */
var React = require('react/addons');
var Field = React.createClass({
  getInitialState: function() {
    return {
      config: {
        type: 'text',
        name: '',
        ref: 'field',
        label: '',
        value: null,
        required: false
      }
    };
  },
  componentDidMount: function(){
    var field = this.props.config;

//    var fieldName = '';
//    var fieldValue = null;
//    var fieldRequired = field.hasOwnProperty('required') ? field.required : false;
//    var fieldType = 'text';
//
//    for (var key in field) {
//      if (key !== 'required' && field.hasOwnProperty(key)) {
//        fieldName = key;
//        fieldValue = field[key];
//        fieldType = this.getFieldType(fieldValue);
//      }
//
//    }
    this.setState({
      type: field._type,
      name: field._name,
      ref: field._name,
      label: field._label,
      value: field._value,
      required: field._required
    });
  },

  handleChange: function(event){
    this.setState({value: event.target.value});
  },
  getConfig: function(){
    return {
      value: this.state.value,
      name: this.state.name,
      ref: this.state.ref,
      label: this.state.label,
      type: this.state.type,
      required: this.state.required
    };
  },
  render: function() {

    var config = this.getConfig();

//    <Field config={field} ref={fieldName} name={fieldName} label={fieldName} defaultValue={fieldValue} required={required}/>

    return (
      <div className="form-group" ref={config.ref}>
        <label htmlFor={config.name} className="col-sm-2 control-label" ref={config.ref+'Label'}>
          {config.label}
        </label>
        <div className="col-sm-10">
        {this.renderTextInput(config)}
        </div>
      </div>
      );
  },
  renderTextInput: function(config){
    //TODO: figure out a better way to handle the required attribute; can't figure out how to make the entire attribute dynamic with react

    if (config.required) {
      return <input ref={config.ref+'Input'} name={config.name} type={config.type} value={config.value} onChange={this.handleChange} required="required"/>
    } else {
      return <input ref={config.ref+'Input'} name={config.name} type={config.type} value={config.value} onChange={this.handleChange} />
    }
  }
});

module.exports = Field;