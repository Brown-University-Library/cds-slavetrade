const _ = require('lodash');
const _entries = require('../Data.js')._entries;

module.exports = {
  method: 'GET',
  path: '/api/v1/entries',
  handler: (request, reply) => {
    // TODO: auth with this stuff
    let user = request.user || '123';
    let usersEntries = _.filter(_entries, (item) => {
      return _.indexOf(item.meta.usersWithAccess, user) != -1;
    })
    reply(JSON.stringify(usersEntries));
  }
}
