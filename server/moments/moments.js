/**
 * Created by KeiSei on 2017/3/14.
 */
var express = require('express');
var router = express.Router();
var Moment = require('../models/Moment');
var bodyParser = require('body-parser');
var hint = require('../utils/constants');
var User = require('../models/User');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.use(bodyParser.json());

router.get('/', function(req, res) {
  var momentsPromise = Moment.find().exec()
  momentsPromise.then(function (moments) {
    User.populate(moments, { path: 'user', select: ['username', 'avatar', 'status'] }, function(err, moments) {
      moments.forEach(function (moment) {
      })
      return moments
    }).then(function (moments) {
      res.status(200).send(moments)
    })
  })
})

module.exports = router;
