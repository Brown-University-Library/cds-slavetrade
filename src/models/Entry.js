const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    _id: String,
    meta: {
      category: String,
      identifier: Number,
      stage: String,
      prevVersions: String, //[Schema.Types.ObjectId],
      updatedBy: String, //Schema.Types.ObjectId,
      lastModified: String,
      usersWithAccess: [String]
    },
    date: {
      year: String,
      month: String,
      day: String
    },
    names: {
      values: [
        {
          firstName: String,
          lastName: String
        }
      ],
      index: Number
    },
    tribe: String,
    origin: String,
    sex: String,
    age: String,
    mannerOfEnslavement: String,
    owner: {
      title: String,
      givenName: String,
      familyName: String
    },
    stringLocation: String,
    colonyState: String,
    nationalContext: String,
    dateOfRunaway: {
      year: String,
      month: String,
      day: String
    },
    partner: {
      inDatabase : Boolean,
      givenName: String,
      familyName: String
    },
    sourceType: String,
    recordType: String,
    citation: String,
    additionalInfo: String,
    researcherNotes: String
});


const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
