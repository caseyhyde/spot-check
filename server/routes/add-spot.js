var express = require('express');
var app = express();
var router = express.Router();
var Spot = require('../models/newSpot');
var multer = require('multer');
var aws = require('aws-sdk');
var s3 = new aws.S3();
var multerS3 = require('multer-s3');
var uuid = require('../modules/uuid-creator');
var bucketCreator = require('../middleware/bucketCreator');
// var nodemailer = require('nodemailer');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var ConfirmSpot = require('../models/confirmSpot');
var mongoConnection = require('../modules/mongo-connection');
var SearchSpot = require('../models/searchSpot');
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
      cb(null, req.bucket);//req.bucket added in middleware "bucketCreator.js"
    },
    key: function(req, file, cb) {
      let currentKey = "";
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
//add req.bucket
router.use('/test', bucketCreator);
//send req through multerS3 to aws (max of 10 files)
router.post('/test', upload.array('file', 10), function(req, res, next) {
  spot.info = req.body;
  spot.images.bucket = req.bucket;
  spot.info.confirmationKey = uuid();
  console.log("spot with image location: ", spot);
  //
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

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: 'hyde.casey@gmail.com',
            },
          ],
          subject: 'Hello World from the SendGrid Node.js Library!',
        },
      ],
      from: {
        email: 'prime.casey.hyde@gmail.com',
      },
      content: [
        {
          type: 'text/plain',
          value: 'Hello, Email!',
        },
      ],
    },
  });
  //With promise
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

/************************************
NOT USING THIS, SWITCHED TO SENDGRID
*************************************/
// var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//       user: 'spot.check.app.donotreply@gmail.com', // Your email id
//       pass: 'pr1g3n9509' // Your password
//   }
// });
// var text = "Thank you for posting to Spot Check! \n\n please click the link below to confirm your Spot: \n\n " +
// "http://localhost:8000/#/confirmSpot/confirmationKey/" + spot.info.confirmationKey;
// var mailOptions = {
//   from: 'spot.check.app.donotreply@gmail.com',
//   to: spot.info.email,
//   subejct: 'test email',
//   text: text
// }
// transporter.sendMail(mailOptions, function(err, info) {
//   if(err) {
//     console.log(err);
//     // res.json({yo: 'error'});
//   } else {
//     console.log('message sent: ', info.response);
//     // res.json({yo: info.response});
//   }
// });
