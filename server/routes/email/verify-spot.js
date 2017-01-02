var express = require('express');
var app = express();
var router = express.Router();
//Bring in aws sdk
var aws = require('aws-sdk');
//Bring in aws ses
var ses = new aws.SES({apiVersion: '2010-12-01'});
