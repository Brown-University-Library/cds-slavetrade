const User = require('../models/User.js');
const db = require('../database');
const Bcrypt = require('bcrypt');

module.exports = {
  validate: function(request, username, password, callback) {

    User.findOne({ "username": username }, (err, user) => {

      if (err || user == null) {
        callback(null, false);
        return;
      }

      Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, user);
        return;
      });
    });
  },
  ADMIN: "Admin"
}
