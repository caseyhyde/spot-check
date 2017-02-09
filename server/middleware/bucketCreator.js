var Sentencer = require('sentencer');
var aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID
});

var s3 = new aws.S3();

var bucketCreator = function(req, res, next) {
  console.log("keys: ", process.env.SECRET_ACCESS_KEY, process.env.ACCESS_KEY_ID);
  //make random bucket name:
  var bucket = Sentencer.make("{{adjective}}-{{noun}}");
  //create new bucket on S3:
  s3.createBucket({Bucket: bucket}, function(err) {
    if(err) {
      console.log("err: ", err);
    } else {
      console.log("Successfully create new bucket: ", bucket);
      req.bucket = bucket;
      next();
    }
  });
  //put new bucket name on request:


  //go to next middleware:
}

module.exports = bucketCreator;
