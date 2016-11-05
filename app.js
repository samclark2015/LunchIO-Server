// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var secret = 'jfoinoigfhoifhj3iht039tujg0iejfPJ)fjhaoihf';

mongoose.connect('mongodb://lunchio-dev:lunchio1234567890@localhost/lunchio-dev');

// ROUTES FOR OUR API
// =============================================================================
// more routes for our API will happen here
var locations = require('./routes/locations');
var users = require('./routes/users');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/locations', jwt({secret: secret}), locations);
app.use('/users', users);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
