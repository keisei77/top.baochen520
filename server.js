/**
 * Created by KeiSei on 2017/3/5.
 */
var express = require('express');
var app = express();
var login = require('./server/account/login');
var register = require('./server/account/register');
var publish = require('./server/moments/publish');
var moments = require('./server/moments/moments');
var qiniuUpload = require('./server/utils/qiniuUtil');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ixiqi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connect mongodb successfully!');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since");
  res.header("Access-Control-Expose-Headers", "Date");
  next();
});

app.use(express.static(__dirname + 'src'));
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/publish', publish);
app.use('/api/moments', moments);
app.use('/api/token', qiniuUpload);

app.listen(3000);
