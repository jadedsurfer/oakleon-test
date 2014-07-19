// preprocessor.js

var ReactTools = require('react-tools');
module.exports = {
  process: function(src, path){
    if (path.match(/\.jsx$/)) {
      src = '/** @jsx React.DOM */' + src;
    }
    return ReactTools.transform(src);
  }
};