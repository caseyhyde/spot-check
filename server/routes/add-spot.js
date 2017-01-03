var express = require('express');
var app = express();
var router = express.Router();
var Spot = require('../models/newSpot');
var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var uuid = require('../modules/uuid-creator');
var keys = require('../../credentials/env.js');
var bucketCreator = require('../middleware/bucketCreator');
var nodemailer = require('nodemailer');
var ConfirmSpot = require('../models/confirmSpot');



/*******************
SET AWS CREDENTIALS
********************/
aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID
});


/******************
GLOBAL SPOT OBJECT
*******************/
var spot = {
  info: {},
  images: {
    bucket: "",
    urls: []
  }
};


var s3 = new aws.S3();
/*********************************
Create new uuid
**********************************/
var currentKey = "";

function newKey() {
  console.log("New Key fxn called");
  currentKey = uuid();
  return currentKey;
}

/*********************************
Set multer to upload to AWS S3
instead of local storage
**********************************/
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: function(req, file, cb) {
      /*************************
      Each request gets it's own
      bucket, 1 bucket can have
      multiple files
      **************************/
      cb(null, req.bucket);
    },
    key: function(req, file, cb) {
      console.log("request files length inside key multerS3 function: ", req.files.length);

      currentKey = uuid();
      imageIndex = req.files.length;
      spot.images.urls.push({
        image: imageIndex,
        url: "https://s3.amazonaws.com/" + req.bucket + "/" + currentKey
      });

      cb(null, currentKey);
    },
    acl: 'public-read' //storing files as public for now...
  })
});



//adds req.bucket
router.use('/test', bucketCreator);

//send req through multerS3 to aws (max of 10 files)
router.post('/test', upload.array('file', 10), function(req, res, next) {
  console.log("Req.body: ", req.body);
  console.log("Req.files: ", req.files);
  spot.info = req.body;
  spot.images.bucket = req.bucket;
  // spot.imageLocation = {
  //   bucket: req.bucket,
  //   key: currentKey,
  //   url: "https://s3.amazonaws.com/" + req.bucket + "/" + currentKey
  // };
  console.log("spot with image location: ", spot);

  var confirmSpot = new ConfirmSpot(spot);

  confirmSpot.save(function(err, data) {
    // console.log("Add spot newSpot.save: ", newSpot.save());
    if(err) {
      console.log("Query error adding new spot: ", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
      resetSpot();
    }
  });//end save

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'spot.check.app.donotreply@gmail.com', // Your email id
        pass: 'pr1g3n9509' // Your password
    }
  });
  var text = 'Hello world from \n\n' + "Casey";
  var mailOptions = {
    from: 'spot.check.app.donotreply@gmail.com',
    to: 'prime.casey.hyde@gmail.com',
    subejct: 'test email',
    text: text
  }
  transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
      console.log(err);
      // res.json({yo: 'error'});
    } else {
      console.log('message sent: ', info.response);
      // res.json({yo: info.response});
    }
  });
  // next();

});//end test route


function resetSpot() {
  spot = {
    info: {},
    images: {
      bucket: "",
      keys: {}
    }
  };
}
// function spotMaker(fileArray, spotData) {
//   var spot = spotData;
//
//   for (var i = 0; i < fileArray.length; i++) {
//     spot["image" + i] = fileArray[i];
//   }
//
// }

 module.exports = router;
