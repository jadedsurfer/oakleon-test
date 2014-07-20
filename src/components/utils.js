// src/utils.js

module.exports = {
  getType: function (value) {
    'use strict';
    var type = 'text';

    switch (typeof value) {
      case 'boolean':
        type = 'boolean';
        break;
      case 'number':
        //TODO: probably need a better way to determine dates
        if (value.toString().length === 13) {
          type = 'date';
          break;
        }
        type = 'number';
        break;
      case 'string':
        type = 'text';
        break;
      case 'object':
        if (value === null) {
          type = 'text';
        } else {
          type = 'object';
        }
        break;
      case 'undefined':
        type = 'text';
        break;
      case 'symbol':
        type = 'error';
        break;
      case 'function':
        type = 'error';
        break;
      default:
        type = 'text';
    }
    return type;
  },
  formatTime: function (unixTimeInMilliseconds) {
    'use strict';

    // TODO: handle the date conversion better; use moment.js
    var date = new Date(unixTimeInMilliseconds);
    return date.toString();
  }
}