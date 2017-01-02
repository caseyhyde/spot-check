var mongoose = require('mongoose'); //Bring in Mongoose module
var Schema = mongoose.Schema; //var Shema is a Mongoose Schema

var spotInfo = new Schema({ //var newSpot is a new Mongoose Schema
  spotName: String, //convert  all strings to lowercase
  streetAddress: String,
  city: String,
  state: String,
  zip: Number,
  notes: String,
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
