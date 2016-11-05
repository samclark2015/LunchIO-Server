var express = require('express');
// var jwt = require('jsonwebtoken');
var Location = require('../models/location');

var router = express.Router();
// var secret = 'jfoinoigfhoifhj3iht039tujg0iejfPJ)fjhaoihf';

/* GET home page. */
router.get('/', function (req, res, next) {
	Location.find({}, function (err, docs) {
		if (err) {
			res.send(err)
			return;
		}
		res.json(docs);
	});
});

router.post('/:id', function (req, res, next) {
	Location.findOne({_id: req.params.id}, function (err, location) {
		if (err) {
			res.send(err);
			return;
		}
		location.checkins.push({
			name: req.user.name,
			userID: req.user._id
		});
		location.save(function(err){
			if(err){
				res.send(err);
				return;
			}
			res.send(200);
		});
	});
});

module.exports = router;
