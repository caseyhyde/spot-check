var mongoose = require('mongoose'); //Bring in Mongoose module
var Schema = mongoose.Schema; //var Shema is a Mongoose Schema

var spotInfo = new Schema({ //var newSpot is a new Mongoose Schema
  spotName: {type: String, lowercase: true, required: true}, //convert  all strings to lowercase
  streetAddress: {type: String, lowercase: true, required: true},
  city: {type: String, lowercase: true, required: true},
  state: {type: String, lowercase: true, required: true},
  zip: Number,
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
  images: spotImages
})


var newSpot = mongoose.model('Spot', newSpotSchema);

module.exports = newSpot;
