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
      value: null
    };
  },
  componentDidMount: function(){
    this.setState({
      type: this.props.type,
      name: this.props.name,
      ref: this.props.ref || this.props.name,
      label: this.props.label,
      value: this.props.defaultValue
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
    return (
      <div className="form-group" ref={ref+'Group'}>
        <label htmlFor={name} className="col-sm-2 control-label" ref={ref+'Label'}>
          {label}
        </label>
        <div className="col-sm-10">
          <input ref={ref+'Input'} name={name} type={type} value={value} onChange={this.handleChange} />
        </div>
      </div>
      );
  }
});

module.exports = Field;