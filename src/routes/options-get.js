//const _ = require('lodash');
const Options = require('../models/Options.js');
const db = require('../database');

module.exports = {
  method: 'GET',
  path: '/api/v1/options',
  handler: (request, reply) => {
    // we're connected!
    // TODO: auth with users
    Options.find((err, options) => {
      console.log(options[0]);
      if (err) {
        console.log(err);
        reply("500 Error. Try again.");
        return;
      }

      reply(JSON.stringify(options[0]));
    });
    // let usersEntries = _.filter(_entries, (item) => {
    //   return _.indexOf(item.meta.usersWithAccess, user) != -1;
    // })
    // reply(JSON.stringify(usersEntries));
  }
}
