const mongoose = require('mongoose');

const Schema = mongoose.Schema({
	location: {
    city: String,
    state: String,
    country: String,
    zip: String,
  },
	amount: String,
	phoneNumber: String,
	fishName: String,
  dateEntered: {type: Date, default: Date.now},
});

const Model = mongoose.model('Buy', Schema);

module.exports = Model;
