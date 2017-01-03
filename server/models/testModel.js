var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spotInfo = new Schema ({
  zip: Number
})

var testSpot = mongoose.model('testSpot', spotInfo);

module.exports = testSpot;
