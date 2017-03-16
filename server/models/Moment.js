/**
 * Created by KeiSei on 2017/3/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var momentSchema = mongoose.Schema({
  imgSrc: String,
  description: String,
  createDate: { type: Date, default: Date.now },
  user: { type: ObjectId, ref: 'User' }
});

var Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;
