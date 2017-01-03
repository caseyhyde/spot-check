var express = require('express');
var router = express.Router();
var SpotToConfirm = require('../models/confirmSpot');
var NewSpot = require('../models/newSpot');


router.get('/*', function(req, res) {
  console.log("confirm get route hit");
  var key = req.headers.key;
  console.log("req.headers: ", req.headers);

  SpotToConfirm.find({'info.confirmationKey': key}, function(err, spots) {
    if(err) {
      console.log("Query error finding matching spots with that key");
      res.sendStatus(500);
    } else {
      console.log("Spots found: ", spots);
      res.send(spots);
    }
  });


});//end route

router.post('/*', function(req, res) {
  console.log("Post req: ", req.body);
  var spot = req.body;
  var newConfirmedSpot = new NewSpot(spot);

  newConfirmedSpot.save(function(err, data) {
    if(err) {
      console.log("query error adding new spot to final database: ", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })

});//end route

module.exports = router;
