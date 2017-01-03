var express = require('express');
var router = express.Router();
var testSpot = require('../models/testSpot');


router.post('/', function(req, res) {
  // var newTestSpot = new testSpot()
  console.log("Test req: ", req);
})


module.exports = router;
