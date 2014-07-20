// __tests__/app.js

/** @jsx React.DOM */
jest.dontMock('../app.jsx');
jest.dontMock('../utils.js');
describe('App', function() {
  var App = require('../app.jsx');

  it('adds basic metadata to each field', function() {
    var config = {
      "id":"123",
      "fields":[
        {"firstname":"Todd"}
      ]
    };
    var cleanConfig = App.prepareConfig(config);
    var field = cleanConfig.fields[0];

    expect(field._name).toBe('firstname');
    expect(field._label).toBe('firstname');
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
    var cleanConfig = App.prepareConfig(config);
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
    var cleanConfig = App.prepareConfig(config);
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
    var cleanConfig = App.prepareConfig(config);
    var field = cleanConfig.fields[0];

    expect(field._checked).toBeTruthy();
    expect(field._type).toBe('boolean');
  });

  // may not need this one
  xit('flattens fields with object values', function(){
    var config = {
      "id":"123",
      "fields":[
        {"roles":{
          "sales":true,
          "admin":false
        }}
      ]
    };
    var cleanConfig = App.prepareConfig(config);
    var field1 = cleanConfig.fields[0];
    var field2 = cleanConfig.fields[1];

    expect(field1._name).toBe('roles["sales"]');
    expect(field1._checked).toBeTruthy();
    expect(field1._type).toBe('boolean');

    expect(field2._name).toBe('roles["admin"]');
    expect(field2._checked).toBeFalsy();
    expect(field2._type).toBe('boolean');
  });

});
