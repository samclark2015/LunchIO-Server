var mongoose = require('mongoose');

var model = mongoose.model('User', {
  name: String,
  email: String,
  password: { type: String, select: false },
  joinedOn: { type: Date, default: Date.now },
  bio: String,
  following: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  private: Boolean
});

module.exports = model;
