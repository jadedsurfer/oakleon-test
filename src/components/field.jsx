/** @jsx React.DOM */
var React = require('react/addons');
var Field = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.defaultValue
    };
  },
  handleChange: function(event){
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
      <input name={this.props.name} type={this.props.type} onChange={this.handleChange} value={value}/>
      );
  }
});

module.exports = Field;
