var express = require('express'); //Bring in express
var app = express(); //Creat app variable for calling express
var bodyParser = require('body-parser'); //Bring in body-parser
var path = require('path');

var port = process.env.PORT || 3000;

app.use(express.static('server/public'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});//Send index.html on page load




app.listen(port, function() {
  console.log("Listening on port: ", port);
});
