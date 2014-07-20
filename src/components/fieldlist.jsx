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
  render: function() {
    var fields = this.state.fields;

    if (fields.length > 0 && fields !== 'undefined') {

      var fieldsToRender = fields.map(function(field){
        return <Field config={field} ref={field._name} />;
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
