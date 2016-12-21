var express = require('express');
var router = express.Router();
var Spot = require('../models/newSpot');
var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var uuid = require('../modules/uuid-creator');
var keys = require('../../credentials/env.js');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-east-2'
});

var s3 = new aws.S3();

/*********************************
Create new uuid
**********************************/
var currentKey = "";
var currentBucket = "prime-spot-check-demo";

function newKey() {
  console.log("New Key fxn called");
  currentKey = uuid();
  return currentKey;
}

function newBucket() {
  console.log("New Bucket fxn called");
  currentBucket = uuid();
  return currentBucket;
}
/*********************************
Set multer to upload to AWS S3
instead of local storage
**********************************/
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: function(req, file, cb) {
      cb(null, currentBucket);
    },
    key: function(req, file, cb) {
      var currentKey = newKey();
      cb(null, currentKey);
    },
    acl: 'public-read'
  })
});

router.post('/test', upload.array('file', 50), function(req, res, next) {

  console.log('test file post route hit');
  console.log("Req.body: ", req.body);
  console.log("Req: ", req.files);
  var spot = req.body;
  spot.imageLocation = {
    bucket: currentBucket,
    key: currentKey,
    url: "https://s3.amazonaws.com/" + currentBucket + "/" + currentKey
  };
  console.log("spot with image location: ", spot);

  var newSpot = new Spot(spot);

  newSpot.save(function(err, data) {
    if(err) {
      console.log("Query error adding new spot: ", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });//end save

});//end test route


/*************************************/

// router.post('/', function(req, res) {
//   console.log('Add Spot route hit. Spot to add: ', req.body);
//
//   var newSpot = new Spot(req.body);
//
//   newSpot.save(function(err, data) {
//     if(err) {
//       console.log("Query error adding new spot: ", err);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(201);
//     }
//   });//end save
// })//End post route
 module.exports = router;
