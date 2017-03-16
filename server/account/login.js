/**
 * Created by KeiSei on 2017/3/12.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bodyParser = require('body-parser');
var hint = require('../utils/constants');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.use(bodyParser.json());

router.post('/', function(req, res) {
  var user = req.body;
  User.findOne({username: user.username}, function(error, singleUser) {
    if (error) {
      var stack = error.error.stack;
      var message = error.error.toString();
      if (stack) {
        message += '\n' + stack;
      }
      res.send(message);
      throw new Error('oh no!');
    } else {
      if(!singleUser || singleUser.username !== user.username) {
        res.status(500).send({errorCode: hint.USER_NOT_FOUND});
      } else if (singleUser.username === user.username && singleUser.password === user.password) {
        res.status(200).send({successCode: hint.LOGIN_SUCCESSFULLY, user: singleUser});
      } else if (singleUser.username === user.username && singleUser.password !== user.password) {
        res.status(400).send({errorCode: hint.WRONG_PASSWORD});
      }
    }
  })
});

module.exports = router;
