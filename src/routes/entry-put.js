const Entry = require('../models/Entry.js');
const db = require('../database');

module.exports = {
  method: 'PUT',
  path: '/api/v1/entries',
  handler: (request, reply) => {
    // TODO: auth with this stuff
    let user = request.user || '123';

    let entryToSaveJS = JSON.parse(request.payload && request.payload.entry);

    let entryToSave = new Entry(entryToSaveJS);

    // let index = _.findIndex(_entries, (item) => {
    //   console.log(item._id);
    //   return item._id == entryToSave._id;
    // });

    // console.log(index);
    //
    // _entries[index] = entryToSave;

    Entry.findOneAndUpdate({_id: entryToSave._id}, entryToSave, {upsert: true}, (err, entry) => {
      if (err) {
        console.log(err);
        reply("500 Error. Try Again.");
        return;
      }

      let response = {
        success: true
      }

      reply(JSON.stringify(response));
    });

    // if (request.payload.isNew) {
    //   entryToSave.save((err, entry) => {
    //     console.log("saving");
    //     console.log(entry);
    //     if (err) {
    //       console.log(err);
    //       reply("500 Error. Try Again.");
    //       return;
    //     }
    //
    //     let response = {
    //       success: true
    //     }
    //
    //     reply(JSON.stringify(response));
    //   });
    // } else {
    //   Entry.update({_id: entryToSaveJS._id}, )
    // }
  }
}
