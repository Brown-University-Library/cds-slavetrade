const mongoose = require('mongoose');
const mongo_url = require('../config/database.config.js').mongo_url;

mongoose.connect(mongo_url);
const db = mongoose.connection;

db.once('open', function() {
  module.exports = db;
});
