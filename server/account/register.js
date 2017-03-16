/**
 * Created by KeiSei on 2017/3/12.
 */
var express = require('express');
var User = require('../models/User');
var bodyParser = require('body-parser');
var router = express.Router();
var hint = require('../utils/constants');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.use(bodyParser.json());

router.post('/', function (req, res) {
  var userInformation = req.body;
  var query = User.findOne({username: userInformation.username});
  var promise = query.exec();
  promise.then(function (userInfo) {
    if (userInfo && userInfo.username === userInformation.username) {
      res.status(500).send({errorCode: hint.USER_HAS_REGISTER});
    } else {
      var user = new User();
      user.username = userInformation.username;
      user.password = userInformation.password;
      user.phone = userInformation.phone;
      user.address = userInformation.address;
      user.email = userInformation.email;
      user.avatar = userInformation.avatar;
      user.status = userInformation.status;
      user.createDate = new Date();
      user.save(function (err) {
        if (err) {
          var stack = error.error.stack;
          var message = error.error.toString();
          if (stack) {
            message += '\n' + stack;
          }
          res.send(message);
          throw new Error('oh no!');
        }
        res.status(200).send({message: 'ok'})
      });
    }
  })
});

module.exports = router;
