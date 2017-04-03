let users = [
  {
    "_id" : "123",
    "givenName": "Cole"
  }
]

let e1 = {
  "_id" : "e1",
  "meta" : {
    "stage": "Public", // Public, Internal, Draft
    "prevVersions": [], //objectIDs
    "updatedBy": "123", //user
    "lastModified": "2017-03-23T15:29:16.176Z",
    "usersWithAccess": ["123"] //users (only used in Internal stage)
  },
  "date" : {
    "year" : 1920,
    "month" : "April",
    "day" : 14
  },
  "indigenousName" : "",
  "baptismalName" : {
    "givenName" : "First",
    "familyName" : "Last Steen"
  },
  "tribe" : "Tribe",
  "origin" : "Origin",
  "sex" : "Sex",
  "age" : "Teen or 15",
  "mannerOfEnslavement" : "Slavery",
  "owner" : {
    "title" : "Captain",
    "givenName" : "First",
    "familyName" : "Last"
  },
  "partner" : {
    "inDatabase" : false,
    "givenName" : "First",
    "familyName" : "Last"
  }
};

let e2 = {
  "_id" : "e2",
  "meta" : {
    "stage": "Draft", // Public, Internal, Draft
    "prevVersions": [], //objectIDs
    "updatedBy": "123", //user
    "lastModified": "2017-01-23T15:29:16.176Z",
    "usersWithAccess": ["123"] //users (only used in Internal stage)
  },
  "date" : {
    "year" : 1400,
    "month" : "June",
    "day" : 10
  },
  "indigenousName" : "I Name",
  "baptismalName" : {
    "givenName" : "First",
    "familyName" : "Last"
  },
  "tribe" : "Tribe",
  "origin" : "Origin",
  "sex" : "Sex",
  "age" : "Teen or 15",
  "mannerOfEnslavement" : "Slavery",
  "owner" : {
    "title" : "General",
    "givenName" : "First",
    "familyName" : "Last"
  },
  "partner" : {
    "inDatabase" : false,
    "givenName" : "First",
    "familyName" : "Last"
  }
};

let entries = [e1, e2];

module.exports._entries = entries;
module.exports.users = users;
