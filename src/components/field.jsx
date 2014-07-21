// src/components/field.jsx

/** @jsx React.DOM */
var React = require('react/addons');
var Input = require('react-bootstrap').Input;
var Field = React.createClass({
  getInitialState: function() {
    return {
      config: {
        type: 'text',
        name: '',
        ref: 'field',
        label: '',
        value: null,
        required: false,
        checked: false,
        options: []
      }
    };
  },
  componentDidMount: function(){
    var field = this.props.config;
    this.setState({
      type: field._type,
      name: field._name,
      ref: field._name,
      label: field._label,
      value: field._value,
      required: field._required,
      checked: field._checked,
      options: field._options || []
    });
  },

  handleChange: function(event){
    switch (event.target.type) {
      case 'checkbox':
        this.setState({checked: event.target.checked});
        break;
      case 'option':
        console.log('option changed');
        console.log(event.target);
        break;
      case 'select-multiple':
        // Had to hack this because the getValue function from react-bootstrap didn't seem to work
        var newValue = [];
        var selectedOptions = this.refs.rolesInput.getDOMNode().lastChild.lastChild.selectedOptions;
        for (var i = 0; i < selectedOptions.length; i++) {
          newValue[i] = selectedOptions[i].value;
        }
        this.setState({value: newValue});
        break;
      default:
        this.setState({value: event.target.value});
    }
  },
  getConfig: function(){
    return {
      value: this.state.value,
      name: this.state.name,
      ref: this.state.ref,
      label: this.state.label,
      type: this.state.type,
      required: this.state.required,
      checked: this.state.checked,
      options: this.state.options
    };
  },
  render: function() {
    var config = this.getConfig();
    return this.renderField(config);
  },
  renderField: function(config){
    var field;
    switch (config.type){
      case 'text':
        field = this.renderTextInput(config);
        break;
      case 'boolean':
        field = this.renderCheckbox(config);
        break;
      case 'select':
        field = this.renderMultiSelect(config);
        break;
      default:
        field = this.renderTextInput(config);
    }
    return field;
  },
  renderTextInput: function(config){
    return (
      <Input
      type="text"
      value={config.value}
      label={config.label}
      ref={config.ref+'Input'}
      groupClassName="form-group"
      wrapperClassName="col-sm-6"
      labelClassName="col-sm-2 control-label"
      onChange={this.handleChange}
      name={config.name}
      required={config.required}
      />
    );
  },
  renderCheckbox: function(config){
    return (
      <Input
        type="checkbox"
        checked={config.checked}
        label={config.label}
        ref={config.ref+'Input'}
        groupClassName="form-group"
        wrapperClassName="col-sm-6"
        labelClassName="col-sm-2 control-label"
        onChange={this.handleChange}
        name={config.name}
        required={config.required}
       />
      );
  },
  renderMultiSelect: function(config){
    var optionsToRender = config.options.map(this.renderSelectOption);
    return (
      <Input
        multiple
        type="select"
        defaultValue={config.value}
        label={config.label}
        ref={config.ref+'Input'}
        groupClassName="form-group"
        wrapperClassName="col-sm-6"
        labelClassName="col-sm-2 control-label"
        onChange={this.handleChange}
        name={config.name}
        required={config.required}
      >
        {optionsToRender}
      </Input>
    );
  },
  renderSelectOption: function(option){
    return <option key={option} value={option} >{option}</option>;
  },
  renderGrid: function(config){
    var optionsToRender = config.options.map(this.renderSelectOption);
    return (
      <Input
      multiple
      type="select"
      defaultValue={config.value}
      label={config.label}
      ref={config.ref+'Input'}
      groupClassName="form-group"
      wrapperClassName="col-sm-6"
      labelClassName="col-sm-2 control-label"
      onChange={this.handleChange}
      name={config.name}
      required={config.required}
      >
        {optionsToRender}
      </Input>
      );
  }
});

module.exports = Field;