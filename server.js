/**
 * Created by KeiSei on 2017/3/5.
 */
var express = require('express');
var https = require('https');
var fs = require('fs');
var http = require('http');
var app = express();
var login = require('./server/account/login');
var register = require('./server/account/register');
var publish = require('./server/moments/publish');
var moments = require('./server/moments/moments');
var qiniuUpload = require('./server/utils/qiniuUtil');

var privateKey  = fs.readFileSync('/home/ssl/www.baochen520.top.key');
var certificate = fs.readFileSync('/home/ssl/www.baochen520.top.pem');
// var credentials = {key: privateKey, cert: certificate};

var options = {
  key: privateKey,
  cert: certificate
};

var mongoose = require('mongoose');

mongoose.connect('mongodb://23.105.205.168:27077/ixiqi');
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

var httpsServer = https.createServer(options, app);
var SSLPORT = 3000;

httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://23.105.205.168:%s', SSLPORT);
});
