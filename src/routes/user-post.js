const User = require('../models/User.js');
const db = require('../database');
const Bcrypt = require('bcryptjs');

const saltRounds = 10;

module.exports = {
  method: 'POST',
  path: '/api/v1/users',
  handler: (request, reply) => {
    let userJS = JSON.parse(request.payload.user); //request.payload.options;
    Bcrypt.hash(userJS.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      userJS.password = hash;
      let user = new User(userJS);
      user.save((err, user) => {
        if (err) {
          console.log(err);
          reply("500 Error. Try Again.");
          return;
        }

        let response = {
          success: true,
          data: user
        }

        reply(JSON.stringify(response));
      });
    });
  }
}
