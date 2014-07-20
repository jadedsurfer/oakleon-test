// src/utils.js

exports.getType = function(value){
  'use strict';

  var type = 'text';

  switch (typeof value) {
    case 'undefined':
      type='text';
      break;
    case 'object':
      if (value === null){
        type='text';
      } else {
        type = 'object';
      }
      break;
    case 'boolean':
      type='boolean';
      break;
    case 'number':
      type='number';
      break;
    case 'string':
      type='text';
      break;
    case 'symbol':
      type='error';
      break;
    case 'function':
      type='error';
      break;
    default:
      type='text';
  }
  return type;
};

exports.formatTime = function(unixTimeInMilliseconds){
  'use strict';

  // TODO: handle the date conversion better; use moment.js
  return new Date(unixTimeInMilliseconds);
};