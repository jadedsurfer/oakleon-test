var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var data = require('./data');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/data.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

app.use('/', express.static(__dirname));

app.listen(3000);

console.log('Server started: http://localhost:3000/');