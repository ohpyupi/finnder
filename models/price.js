const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  fishName: String,
  median: Number,
  mean: Number,
  min: Number,
  max: Number,
  standardDeviation: Number,
  dateEntered: {type: Date, default: Date.now},
});

const Model = mongoose.model('Price', Schema);

module.exports = Model;
