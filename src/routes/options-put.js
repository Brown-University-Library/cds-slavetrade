//const _ = require('lodash');
const Options = require('../models/Options.js');
const db = require('../database');

module.exports = {
  method: 'PUT',
  path: '/api/v1/options',
  handler: (request, reply) => {
    let options = request.payload.options;
    console.log("options",options);
    Options.findOneAndUpdate({_id: options._id}, options, {upsert: true}, (err) => {

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
  }
}
