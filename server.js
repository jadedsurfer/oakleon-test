var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var data = {
  "id":"00000314159265359",
  "fields":[
    {"firstname":"Tim", "required":true},
    {"lastname":"Cash", "required":true},
    {"email":"tim@oakleon.com", "required":true},
    {"Address":"12345 fake street"},
    {"city": "San Diego"},
    {"state": "CA"},
    {"zipcode": "92119"},
    {"date_created":1392164977880},
    {"tag":"technician"},
    {"tag":"user"},
    {"comment":"This is the first comment about Tim"},
    {"comment":"Here is the second comment about Tim"},
    {"comment":"And a third comment about Tim"},
    {"roles":{
      "sales":false,
      "admin":false,
      "tech":true,
      "manager":true
    }}
  ]
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/data.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

app.use('/', express.static(__dirname));

app.listen(3000);

console.log('Server started: http://localhost:3000/');