var mongoose = require('mongoose'); //Bring in Mongoose module
var Schema = mongoose.Schema; //var Shema is a Mongoose Schema

var spotInfo = new Schema({ //var newSpot is a new Mongoose Schema
  spotName: {type: String, lowercase: true, required: true}, //convert  all strings to lowercase
  streetAddress: {type: String, lowercase: true, required: true},
  city: {type: String, lowercase: true, required: true},
  state: {type: String, lowercase: true, required: true},
  zip: {type: Number, required: true},
  notes: {type: String, lowercase: true},
  _id: Object
});//End Schema

var spotImages = new Schema ({
  bucket: String,
  _id: Object,
  urls: [{
    image: Number,
    url: String,
    _id: Object
  }]
});

var newSpotSchema = new Schema ({
  _id: Object,
  info: spotInfo,
  images: spotImages,
}, {
  versionKey: false,
  strict: false
})

// var newSpotSchema = new Schema({Object});



var newSpot = mongoose.model('Spot', newSpotSchema);

module.exports = newSpot;
