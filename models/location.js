var mongoose = require('mongoose');

var checkinSchema = new mongoose.Schema({
  name: String,
  userID: mongoose.Schema.Types.ObjectId,
  date: {type: Date, default: Date.now}
});


var model = mongoose.model('Location', {
  name: String,
  nearby: String,
  desc: String,
  imageString: String,
  imageShift: Number,
  coords: [Number],
  checkins: {type: [checkinSchema], default: []}
});

module.exports = model;
