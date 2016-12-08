var mongoose = require('mongoose'); //Bring in Mongoose module
var Schema = mongoose.Schema; //var Shema is a Mongoose Schema

var newSpotSchema = new Schema({ //var newSpot is a new Mongoose Schema
  spotName: {type: String, lowercase: true, required: true}, //convert  all strings to lowercase
  address: { //address stored as subdocument
    streetAddress: {type: String, lowercase: true, required: true},
    city: {type: String, lowercase: true, required: true},
    state: {type: String, lowercase: true, required: true},
    zip: {type: Number, required: true}
  },
  details: {//details stored as subdocument
    notes: {type: String, lowercase: true},
    keywords: {type: String, lowercase: true}
    //keywords are
    // //an array of lowercase strings to enable searching
  }
});//End Schema

var newSpot = mongoose.model('Spot', newSpotSchema);

module.exports = newSpot;
