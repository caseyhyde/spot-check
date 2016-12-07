var mongoose = require('mongoose');
var connectionString = require('./database-config');

var connectToDatabase = function() {
  mongoose.connect(connectionString);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ', connectionString);
  });

  mongoose.connection.on('error', function(err) {
    console.log('Mongoose failed to connect to the database, ', err);
  });
}// End connection function

module.exports = { connect : connectToDatabase }; //export connection function
