var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spotInfo = new Schema({ //var newSpot is a new Mongoose Schema
  spotName: {type: String, lowercase: true, required: true}, //convert  all strings to lowercase
  streetAddress: {type: String, lowercase: true, required: true},
  city: {type: String, lowercase: true, required: true},
  state: {type: String, lowercase: true, required: true},
  zip: {type: Number, required: true},
  notes: {type: String, lowercase: true},
});//End Schema

var spotImages = new Schema ({
  bucket: String,
  urls: [{
    image: Number,
    url: String
  }]
});

var newSpotSchema = new Schema ({
  info: spotInfo,
  images: spotImages,
  versionKey: false
})

var confirmSpot = mongoose.model('newSpot', newSpotSchema);

module.exports = confirmSpot;
