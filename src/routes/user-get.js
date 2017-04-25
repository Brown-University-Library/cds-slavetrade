//const _ = require('lodash');
const User = require('../models/User.js');
const db = require('../database');

module.exports = {
  method: 'GET',
  path: '/api/v1/users/me',
  handler: (request, reply) => {
    // we're connected!
    // TODO: auth with users
    console.log(request.auth.credentials);
    User.findById(request.auth.credentials._id, (err, options) => {
      console.log(options);
      if (err) {
        console.log(err);
        reply("500 Error. Try again.");
        return;
      }

      reply(JSON.stringify(options));
    });
    // let usersEntries = _.filter(_entries, (item) => {
    //   return _.indexOf(item.meta.usersWithAccess, user) != -1;
    // })
    // reply(JSON.stringify(usersEntries));
  }
}
