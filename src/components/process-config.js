// src/components/processor.js

var utils = require('./utils');
var getType = utils.getType;
var formatTime = utils.formatTime;
var data = require('../../data');

var processor = {
  process: function (config) {
    var fields = config.fields;
    var cleanConfig = {};
    var fieldsWithNoDups = {};

    cleanConfig.id = config.id;
    cleanConfig.fields = this.prepareFields(fields);

    return cleanConfig;
  },
  prepareFields: function (fields) {
    var fieldsWithNoDups = {};
    var arrayWithNoDups = [];

    // Loop through original field array
    for (var i = 0; i < fields.length; i++) {
      var currentField = fields[i];
      var tempField = {};

      // Loop through all of the keys in the field to find the one with the field name and value
      for (var key in currentField) {
        var originalValueForKey = currentField[key];

        // Right now the only other key is the field name so if its not required, process it
        if (key !== 'required') {
          // Prep the tempField for every field in case we need it
          tempField = this.setUpTempField(currentField, key);

          // Check if the field has already been put on the no dups object
          if (fieldsWithNoDups[key] === null || typeof fieldsWithNoDups[key] === 'undefined') {

            // Key doesn't exist or is empty so add it to the temp object so we can find it if it comes up again
            fieldsWithNoDups[key] = tempField;
            arrayWithNoDups.push(fieldsWithNoDups[key]);

          } else {

            // Key already exists so get its value
            var existingFieldValue = fieldsWithNoDups[key]._value;

            if (Array.isArray(existingFieldValue)) {
              // Already an array so add the value to the field
              // This will adopt the type of the first field encountered
              fieldsWithNoDups[key]._value.push(originalValueForKey);
            } else {
              // Convert to array and then add the existing value and the one from this dup
              fieldsWithNoDups[key]._value = [];
              // Assume that the dups represent a 1 to many relationship and should be shown as a list
              fieldsWithNoDups[key]._type = 'list';
              fieldsWithNoDups[key]._value.push(existingFieldValue);
              // This will adopt the type of the first field encountered
              fieldsWithNoDups[key]._value.push(originalValueForKey);
            }
          } // Finish handling dups
        } // Finish check for field
      } // Finish loop of keys
    } // Finish loop of fields

    return arrayWithNoDups;
  },
  setUpTempField: function (field, key) {
    var originalValueForKey = field[key];
    var tempField = {
      _name: key,
      _label: key,
      _value: originalValueForKey,
      _type: null,
      _required: field.required || false,
      _checked: false,
      _options: []
    };
    return this.adjustForFieldTypes(tempField);
  },
  adjustForFieldTypes: function (tempField) {
    var fieldType = getType(tempField._value);
    var originalFieldValue = tempField._value;

    switch (fieldType) {
      case 'date':
        /**
         /* Using a date type field loses fidelity with the sample data given.
         /*
         /* More advanced logic could determine when to use a date type field
         /* and when to use a regular text field.
         /*
         /* Also in this case the field should probably be readonly.
         /*
         **/
        tempField._type = 'text';
        // Convert the unix timestamp into something readable
        tempField._value = formatTime(originalFieldValue);
        break;
      case 'boolean':
        tempField._type = 'boolean';
        // Use checked instead of value
        tempField._checked = originalFieldValue;
        break;
      case 'array':
        tempField._type = 'array';
        break;
      case 'object':
        // Assumes that the properties of the object all have boolean values so will use a select
        // TODO: enhance this to handle cases where the object contains fields with non-boolean values
        tempField._type = 'select';
        // Separate the object into an array of options and an array of selected options
        // TODO: Enhance option processing to allow labels and values to be different
        tempField._options = Object.keys(originalFieldValue);
        tempField._value = this.prepareSelectValues(originalFieldValue);
        break;
      default:
        tempField._type = 'text';
    }

    return tempField;
  },
  prepareSelectValues: function (options) {
    // Used by select type fields to get an array of selected options
    var values = [];
    Object.keys(options).forEach(
      function (key) {
        if (options[key]) {
          values.push(key);
        }
      }
    );
    return values;
  }
};

module.exports = function (config) {
  return processor.process(config);
};