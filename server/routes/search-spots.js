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
  } else if (!zip && !keywords) {
    findAll();
  }

  function findAll() {
    console.log("Searching without Zipcode");
    Spots.find( {},
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

  // function findOneLetter() {
  //   console.log("find one letter");
  //   Spots.find({spotName: new RegExp(keywords, 'i')}, function(err, spots) {
  //     if(err) {
  //       console.log("Querry error searching one letter: ", err);
  //       res.sendStatus(500);
  //     } else {
  //       console.log("spots: ", spots);
  //       if(spots === []) {
  //         console.log("No spots have that letter anywhere...");
  //         res.sendStatus(403);
  //       } else {
  //         console.log("Found these spots: ", spots);
  //         res.send(spots);
  //       }
  //     }
  //   })
  // }


  function findZipAndKeywords() {
    // var keywords = new RegExp(keywords, 'i');
    Spots.find( {$and: [{'address.zip': zip}, {$or: [
      {spotName: new RegExp(keywords, 'i')},
      {'address.streetAddress': new RegExp(keywords, 'i')},
      {'address.city': new RegExp(keywords, 'i')},
      {'address.state': new RegExp(keywords, 'i')},
      {'details.notes': new RegExp(keywords, 'i')},
      {'destails.keywords': new RegExp(keywords, 'i')}
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
    // var keywords = new RegExp(keywords, 'i');
    Spots.find( {$or: [
      {spotName: new RegExp(keywords, 'i')},
      {'address.streetAddress': new RegExp(keywords, 'i')},
      {'address.city': new RegExp(keywords, 'i')},
      {'address.state': new RegExp(keywords, 'i')},
      {'details.notes': new RegExp(keywords, 'i')},
      {'destails.keywords': new RegExp(keywords, 'i')}
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
