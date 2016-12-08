var express = require('express');
var router = express.Router();
var Spots = require('../models/newSpot');


router.get('/', function(req, res) {

  console.log("req.headers: ", req.headers);

  var keywords = req.headers.keywords;
  var zip = req.headers.zip;

  console.log("Search get route hit, searching for terms: ", zip, keywords);

  if(!zip && keywords) {
    keywords = keywords.toLowerCase();
    findJustKeywords();
  } else if (zip && keywords) {
    keywords = keywords.toLowerCase();
    findZipAndKeywords();
  } else if (zip && !keywords) {
    findJustZip();
  }

  

  function findZipAndKeywords() {
    Spots.find( {$and: [{'address.zip': zip}, {$or: [
      {spotName: keywords},
      {'address.streetAddress': keywords},
      {'address.city': keywords},
      {'address.state': keywords},
      {'details.notes': keywords},
      {'destails.keywords': keywords}
    ]}]},
      function(err, spots) {
      if(err) {
        console.log("Query error searching database: ", err);
        res.sendStatus(500);
      } else {
        console.log(spots);
        if(spots == null) { //if no spots are found matching that zipcode:
          console.log("There are no spots with the zipcode: ", searchTerms);
          res.sendStatus(403);
        } else {
          console.log("Found these matches in the db: ", spots);
          res.send(spots);
        }
      }
    });
  }

  function findJustKeywords() {
    console.log("Searching without Zipcode");
    Spots.find( {$or: [
      {spotName: keywords},
      {'address.streetAddress': keywords},
      {'address.city': keywords},
      {'address.state': keywords},
      {'details.notes': keywords},
      {'destails.keywords': keywords}
    ]},
      function(err, spots) {
      if(err) {
        console.log("Query error searching database: ", err);
        res.sendStatus(500);
      } else {
        console.log(spots);
        if(spots == null) { //if no spots are found matching that zipcode:
          console.log("There are no spots with the zipcode: ", searchTerms);
          res.sendStatus(403);
        } else {
          console.log("Found these matches in the db: ", spots);
          res.send(spots);
        }
      }
    });
  }

  function findJustZip() {
    console.log("Searching without Zipcode");
    Spots.find( {'address.zip': zip},
      function(err, spots) {
      if(err) {
        console.log("Query error searching database: ", err);
        res.sendStatus(500);
      } else {
        console.log(spots);
        if(spots == null) { //if no spots are found matching that zipcode:
          console.log("There are no spots with the zipcode: ", searchTerms);
          res.sendStatus(403);
        } else {
          console.log("Found these matches in the db: ", spots);
          res.send(spots);
        }
      }
    });
  }


});//End route

module.exports = router;
