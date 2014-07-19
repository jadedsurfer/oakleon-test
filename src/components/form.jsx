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
        <h1>Oakleon Generated Form</h1>
        <form onSubmit={this.handleSubmit} className="form-horizontal" role="form">
          <input name="id" ref="id" type="hidden" value={this.props.config.id}/>
          <FieldList ref="fieldList" fields={this.props.config.fields} />
          <input ref="submit" type="submit"></input>
        </form>
      </div>
      );
  }
});

module.exports = Form;
