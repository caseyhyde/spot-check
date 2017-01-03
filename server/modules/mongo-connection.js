var mongoose = require('mongoose');

var databaseURI = '';
if(process.env.MONGODB_ADMIN != undefined) {
  databaseURI = process.env.MONGODB_ADMIN;
} else {
  databaseURI = 'mongodb://localhost:27017/spotCheck';
}

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var connectToDatabase = function() {
  mongoose.connect(databaseURI, options);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ', databaseURI);
  });

  mongoose.connection.on('error', function(err) {
    console.log('Mongoose failed to connect to the database, ', err);
  });
}// End connection function

module.exports = { connect : connectToDatabase }; //export connection function
