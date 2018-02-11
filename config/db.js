const mongoose = require('mongoose');

const models = require('../models');
const VAR = require('../config/variables');

mongoose.connect(VAR.MONGO_DB_URI);
const connection = mongoose.connection;

module.exports = {
  connection,
  models,
};
