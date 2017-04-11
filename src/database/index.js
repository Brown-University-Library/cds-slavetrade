const mongoose = require('mongoose');
mongoose.connect('mongodb://st:st@ds049624.mlab.com:49624/coledev');
const db = mongoose.connection;

db.once('open', function() {
  module.exports = db;
});
