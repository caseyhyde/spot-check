var express = require('express');
var router = express.Router();
var Spot = require('../models/newSpot');
var S3FS = require('s3fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();



/***********************************/
            //S3FS

router.use(multipartyMiddleware);

var s3fs = new S3FS('caseystestupload12345', {
  accessKeyId: 'AKIAIJD6BUHKG6YSZRIA',
  secretAccessKey: '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'
});

router.post('/test', function(req, res) {
  console.log('test file post route hit');

  console.log(req.files);
});//end test route


/*************************************/

router.post('/', function(req, res) {
  console.log('Add Spot route hit. Spot to add: ', req.body);

  var newSpot = new Spot(req.body);

  newSpot.save(function(err, data) {
    if(err) {
      console.log("Query error adding new spot: ", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });//end save
})//End post route
 module.exports = router;
