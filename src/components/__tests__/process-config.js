// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../process-config.js');
jest.dontMock('../utils.js');
jest.dontMock('inflection');
describe('App', function() {
  var processConfig = require('../process-config.js');

  it('adds basic metadata to each field', function() {
    var config = {
      "id":"123",
      "fields":[
        {"firstname":"Todd"}
      ]
    };
    var cleanConfig = processConfig(config);
    var field = cleanConfig.fields[0];

    expect(field._name).toBe('firstname');
    expect(field._label).toBe('Firstname');
    expect(field._value).toBe('Todd');
    expect(field._type).toBe('text');
    expect(field._required).toBe(false);

  });

  it('sets required flag', function(){
    var config = {
      "id":"123",
      "fields":[
        {"firstname":"Todd", "required":true}
      ]
    };
    var cleanConfig = processConfig(config);
    var field = cleanConfig.fields[0];

    expect(field._required).toBe(true);
  });

  it('converts date into a human readable date', function(){
    var config = {
      "id":"123",
      "fields":[
        {"date_created":1392164977880}
      ]
    };
    var cleanConfig = processConfig(config);
    var field = cleanConfig.fields[0];

    expect(field._value).toBe('Tue Feb 11 2014 16:29:37 GMT-0800 (PST)');
    expect(field._type).toBe('text');
  });

  it('sets boolean types', function(){
    var config = {
      "id":"123",
      "fields":[
        {"admin":true}
      ]
    };
    var cleanConfig = processConfig(config);
    var field = cleanConfig.fields[0];

    expect(field._checked).toBeTruthy();
    expect(field._type).toBe('boolean');
  });

  it('converts field with object value into an options array', function(){
    var config = {
      "id":"123",
      "fields":[
        {"roles":{
          "sales":true,
          "admin":false,
          "qa":true
        }}
      ]
    };
    var cleanConfig = processConfig(config);
    var field = cleanConfig.fields[0];
    var value1 = field._value[0];
    var value2 = field._value[1];
    var option1 = field._options[0];
    var option2 = field._options[1];
    var option3 = field._options[2];

    expect(field._type).toBe('select');

    expect(field._options.length).toBe(3);
    expect(option1).toBe('sales');
    expect(option2).toBe('admin');
    expect(option3).toBe('qa');


    expect(field._value.length).toBe(2);
    expect(value1).toBe('sales');
    expect(value2).toBe('qa');

  });

  it('converts duplicate fields into an array of values', function(){
    var config = {
      "id":"123",
      "fields":[
        {"tag":"technician"},
        {"tag":"user"},
        {"tag":"tag3"},
        {"comment":"comment1"}
      ]
    };
    var cleanConfig = processConfig(config);
    var field = cleanConfig.fields[0];
    var value1 = field._value[0];
    var value2 = field._value[1];

    expect(field._type).toBe('list');

    expect(field._value.length).toBe(3);
    expect(value1).toBe('technician');
    expect(value2).toBe('user');

  });

});
