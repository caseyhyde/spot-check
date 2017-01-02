var mongoose = require('mongoose');

var databaseURI = '';
if(process.env.MONGODB_URI != undefined) {
  databaseURI = process.env.MONGODB_URI;
} else {
  databaseURI = 'mongodb://localhost:27017/spotCheck';
}

var connectToDatabase = function() {
  mongoose.connect(databaseURI);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ', databaseURI);
  });

  mongoose.connection.on('error', function(err) {
    console.log('Mongoose failed to connect to the database, ', err);
  });
}// End connection function

module.exports = { connect : connectToDatabase }; //export connection function
