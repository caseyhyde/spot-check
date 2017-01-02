var express = require('express'); //Bring in express
var app = express(); //Creat app variable for calling express
var bodyParser = require('body-parser'); //Bring in body-parser
var path = require('path');
// var multer = require('multer');
var mongoConnection = require('./modules/mongo-connection');
var addSpot = require('./routes/add-spot');
var searchSpots = require('./routes/search-spots');
var bucketCreator = require('./middleware/bucketCreator');




var port = process.env.PORT || 3000;

app.use(express.static('server/public'));
app.use(bodyParser.json());//use body parser on all requests

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});//Send index.html on page load


app.use('/addSpot', addSpot);
app.use('/searchSpots', searchSpots);

//Call the function exported as the connect property of mongo-connection
//which connects us to our Mongo database.
mongoConnection.connect();


app.listen(port, function() {
  console.log("Listening on port: ", port);
});
