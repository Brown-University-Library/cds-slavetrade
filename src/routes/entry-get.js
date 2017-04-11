//const _ = require('lodash');
const Entry = require('../models/Entry.js');
const db = require('../database');

module.exports = {
  method: 'GET',
  path: '/api/v1/entries',
  handler: (request, reply) => {
    // TODO: auth with this stuff
    let user = request.user || '123';

    // we're connected!
    // TODO: auth with users
    Entry.find((err, entries) => {
      if (err) {
        console.log(err);
        reply("500 Error. Try again.");
        return;
      }

      reply(JSON.stringify(entries));
    });
    // let usersEntries = _.filter(_entries, (item) => {
    //   return _.indexOf(item.meta.usersWithAccess, user) != -1;
    // })
    // reply(JSON.stringify(usersEntries));
  }
}
