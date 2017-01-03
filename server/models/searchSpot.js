var mongoose = require('mongoose'); //Bring in Mongoose module
var Schema = mongoose.Schema; //var Shema is a Mongoose Schema

var id = new Schema ({
  $oid: String
});

var spotInfo = new Schema({ //var newSpot is a new Mongoose Schema
  spotName: String, //convert  all strings to lowercase
  streetAddress: String,
  city: String,
  state: String,
  zip: Number,
  notes: String,
  _id: id
});//End Schema

var spotImages = new Schema ({
  bucket: String,
  id: Object,
  urls: [{
    image: Number,
    url: String,
    _id: id
  }]
});



var searchSpotSchema = new Schema ({
  _id: id,
  info: spotInfo,
  images: spotImages,
  __v: Number
})


var searchSpot = mongoose.model('SearchSpot', searchSpotSchema);

module.exports = searchSpot;
