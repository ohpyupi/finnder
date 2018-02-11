const mongoose = require('mongoose');

const Schema = mongoose.Schema({
	location: {
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  fishName: String,
  median: Number,
  mean: Number,
  min: Number,
  max: Number,
});

const Model = mongoose.model('Price', Schema);

module.exports = Model;
