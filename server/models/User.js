/**
 * Created by KeiSei on 2017/3/12.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String,
  address: String,
  email: String,
  avatar: String,
  status: String,
  createDate: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
