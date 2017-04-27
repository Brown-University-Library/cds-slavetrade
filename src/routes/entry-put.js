const Entry = require('../models/Entry.js');
const Counter = require('../models/Counters.js');
const db = require('../database');

function getNextSequence(name, alreadyPresent, callback) {
  if (alreadyPresent) {
    callback();
    return;
  }
  Counter.findOneAndUpdate(
    {
    _id: name
    },
    {
      $inc: { seq: 1 }
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },
    (err, ret) => {
      if (err) {
        console.log("err", err);
        return;
      }
      console.log("ret", ret);
      callback(ret);
    }
   )
}

module.exports = {
  method: 'PUT',
  path: '/api/v1/entries',
  handler: (request, reply) => {
    // TODO: auth with this stuff
    let user = request.user || '123';

    let entryToSaveJS = JSON.parse(request.payload && request.payload.entry);

    let entryToSave = new Entry(entryToSaveJS);

    getNextSequence("identifier", entryToSave.meta.identifier, function(counter) {
      console.log(counter);
      if (counter) entryToSave.meta.identifier = counter.seq;
      Entry.findOneAndUpdate({_id: entryToSave._id}, entryToSave, {upsert: true, new: true}, (err, entry) => {
        console.log(entry);
        if (err) {
          console.log(err);
          reply("500 Error. Try Again.");
          return;
        }

        let response = {
          success: true,
          data: entry
        }

        reply(JSON.stringify(response));
      });
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
