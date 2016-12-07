var express = require('express');
var router = express.Router();
var Spot = require('../models/newSpot');

router.post('/', function(req, res) {
  console.log('Add Spot route hit. Spot to add: ', req.body);

  var newSpot = new Spot(req.body);
  console.log(newSpot);

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
