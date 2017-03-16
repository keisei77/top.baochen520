/**
 * Created by KeiSei on 2017/3/14.
 */
var express = require('express');
var router = express.Router();
var Moment = require('../models/Moment');
var bodyParser = require('body-parser');
var hint = require('../utils/constants');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.use(bodyParser.json());

router.post('/', function(req, res) {
  var momentInfo = req.body;
  var moment = new Moment();
  moment.user = momentInfo.user;
  moment.imgSrc = momentInfo.imgSrc;
  moment.description = momentInfo.description;
  moment.save(function(err, success) {
    if (err) {
      throw new Error('oh no!');
    }
    res.status(200).send({message: 'OK'});
  })
})

module.exports = router;
