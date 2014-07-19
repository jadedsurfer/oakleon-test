/** @jsx React.DOM */
var React = require('react/addons');
var FieldList = require('./fieldlist.jsx');
var Form = React.createClass({
  getInitialState: function() {
    return {
      config: {}
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
//    var nextItems = this.state.items.concat([this.state.text]);
//    var nextText = '';
//    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>Oakleon Generated Form</h3>
        <form onSubmit={this.handleSubmit}>
          <input name="id" ref="id" type="hidden" value={this.props.config.id}/>
          <FieldList />
          <input ref="submit" type="submit"></input>
        </form>
      </div>
      );
  }
});

module.exports = Form;
