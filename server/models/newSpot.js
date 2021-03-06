var mongoose = require('mongoose'); //Bring in Mongoose module
var Schema = mongoose.Schema; //var Shema is a Mongoose Schema

var spotInfo = new Schema({ //var newSpot is a new Mongoose Schema
  spotName: {type: String, lowercase: true, required: true}, //convert  all strings to lowercase
  streetAddress: {type: String, lowercase: true, required: true},
  city: {type: String, lowercase: true, required: true},
  state: {type: String, lowercase: true, required: true},
  zip: {type: Number, required: true},
  notes: {type: String, lowercase: true},
  confirmationKey: String,
  email: String
});//End Schema

var spotImages = new Schema ({
  bucket: String,
  urls: [{
    image: Number,
    url: String,
  }]
});

var newSpotSchema = new Schema ({
  info: spotInfo,
  images: spotImages,
});

var newSpot = mongoose.model('spot', newSpotSchema);

module.exports = newSpot;
