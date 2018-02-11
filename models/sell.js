const mongoose = require('mongoose');

const Schema = mongoose.Schema({
	location: String,
	amount: String,
  phoneNumber: String,
	fishName: String,
}); 

const Model = mongoose.model('Sell', Schema);

module.exports = Model;

