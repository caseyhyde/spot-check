var express = require('express');
var router = express.Router();
var Spots = require('../models/newSpot');


router.get('/', function(req, res) {
  var zip = req.headers.zip;
  console.log("Search get route hit, searching for zip: ", zip);

  Spots.find( {'address.zip': zip}, function(err, spots) {
    if(err) {
      console.log("Query error searching database: ", err);
      res.sendStatus(500);
    } else {
      console.log(spots);
      if(spots == null) { //if no spots are found matching that zipcode:
        console.log("There are no spots with the zipcode: ", zip);
        res.sendStatus(403);
      } else {
        console.log("Found these matches in the db: ", spots);
        res.send(spots);
      }
    }
  });




});//End route

module.exports = router;
