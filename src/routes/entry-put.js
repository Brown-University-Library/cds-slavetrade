const _ = require('lodash');
const _entries = require('../Data.js')._entries;

module.exports = {
  method: 'PUT',
  path: '/api/v1/entries',
  handler: (request, reply) => {
    // TODO: auth with this stuff
    let user = request.user || '123';

    let entryToSave = JSON.parse(request.payload && request.payload.entry);

    console.log(entryToSave._id);

    let index = _.findIndex(_entries, (item) => {
      console.log(item._id);
      return item._id == entryToSave._id;
    });

    console.log(index);

    _entries[index] = entryToSave;

    let response = {
      success: true
    }

    reply(JSON.stringify(response));
  }
}
