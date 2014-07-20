/** @jsx React.DOM */
var React = require('react/addons');
var Field = React.createClass({
  getInitialState: function() {
    return {
//      value: this.props.defaultValue,
      type: 'text',
      name: '',
      ref: 'field',
      label: '',
      value: null,
      required: null
    };
  },
  componentDidMount: function(){
    this.setState({
      type: this.props.type,
      name: this.props.name,
      ref: this.props.ref || this.props.name,
      label: this.props.label,
      value: this.props.defaultValue,
      required: this.props.required
    });
  },
  handleChange: function(event){
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    var name = this.state.name;
    var ref = this.state.ref;
    var label = this.state.label;
    var type = this.state.type;
    var required = this.state.required;
    return (
      <div className="form-group" ref={ref+'Group'}>
        <label htmlFor={name} className="col-sm-2 control-label" ref={ref+'Label'}>
          {label}
        </label>
        <div className="col-sm-10">
        {this.renderTextInput(name, type, value, ref, required)}
        </div>
      </div>
      );
  },
  renderTextInput: function(name, type, value, ref, required){
    //TODO: figure out a better way to handle the required attribute; can't figure out how to make the entire attribute dynamic with react

    if (required) {
      return <input ref={ref+'Input'} name={name} type={type} value={value} onChange={this.handleChange} required="required"/>
    } else {
      return <input ref={ref+'Input'} name={name} type={type} value={value} onChange={this.handleChange} />
    }
  }
});

module.exports = Field;