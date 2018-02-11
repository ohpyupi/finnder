const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  location: String,
  amount: String,
  fishName: String,
});

module.exports = Schema;
