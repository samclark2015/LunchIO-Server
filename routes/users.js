var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var router = express.Router();
var secret = "jfoinoigfhoifhj3iht039tujg0iejfPJ)fjhaoihf";
var saltRounds = 10;

router.post('/verify', function(req, res, next){
  jwt.verify(req.body.token, secret, function(err, user){
    if(err) {
      res.send(err);
      return;
    }
    res.json(user);
  });
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  var userData = {
    email: req.body.email
  };
  User.findOne(userData, "+password", function (err, user) {
    if(!err){
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(!err && result === true){
          res.json({
            userData: user,
            token: jwt.sign(""+user._id, secret)
          });
        } else {
          res.json({
            errors: err
          });
        }
      });
    } else {
      res.json({
        error: err
      });
    }
  });
});

router.post('/new', function(req, res, next){
  var user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    bio: req.body.bio,
    private: req.body.private
  };

  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    user.password = hash;
    User.create(user, function (err, user) {
      res.json({
        userData: user,
        token: jwt.sign(user, secret)
      });
    });
  });
});

module.exports = router;
