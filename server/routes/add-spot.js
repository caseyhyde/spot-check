var express = require('express');
var app = express();
var router = express.Router();
var Spot = require('../models/newSpot');
var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var uuid = require('../modules/uuid-creator');
var bucketCreator = require('../middleware/bucketCreator');
var ConfirmSpot = require('../models/confirmSpot');
var mongoConnection = require('../modules/mongo-connection');
var SearchSpot = require('../models/searchSpot');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
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
      console.log("req.body in key: ", req.body);
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
router.use('/test', bucketCreator);//Add req.bucket
//send req through multerS3 to aws (max of 10 files)
router.post('/test', upload.array('file', 10), function(req, res, next) {
  spot.info = req.body;
  spot.images.bucket = req.bucket;
  spot.info.confirmationKey = uuid();
  var confirmSpot = new ConfirmSpot(spot);
  confirmSpot.save(function(err, data) {
    if(err) {
      console.log("Query error adding new spot: ", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
          personalizations: [
            {
              to: [
                {
                  email: spot.info.email,
                },
              ],
              subject: 'Spot Check: Confirm Your New Spot!',
            },
          ],
          from: {
            email: 'spot.check.app.donotreply@gmail.com',
          },
          content: [
            {
              type: 'text/html',
              value: '<html><body><h1>Thanks for using Spot Check!</h1></br><h2>To confirm your new Spot, please click <a href="https://serene-dusk-10274.herokuapp.com/#/confirmSpot/confirmationKey/' + spot.info.confirmationKey + '">HERE</a></h2></body></html>',
            },
          ],
        },
      });
      sg.API(request)
        .then(response => {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        })
        .catch(error => {
          //error is an instance of SendGridError
          //The full response is attached to error.response
          console.log(error.response.statusCode);
        });
      resetSpot();
    }
  });//end save



});//end test route


function resetSpot() {
  spot = {
    info: {},
    images: {
      bucket: "",
      urls: []
    }
  };
}
 module.exports = router;
