var qiniu = require("qiniu");
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('./config.js');

var policy = {
  "scope": config.Bucket_Name,
  "deadline": 1390528576,
  "saveKey": "$(fname)"
};

var uptoken = new qiniu.rs.PutPolicy2(policy);

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.use(bodyParser.json());

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

router.get('/', function (req, res, next) {
  var token = uptoken.token();
  res.header("Cache-Control", "max-age=0, private, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  if (token) {
    res.json({
      uptoken: token
    });
  }
})

module.exports = router;
