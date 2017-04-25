import template from '../views/entry.html';
import Data from '../Data.js';
import _ from 'lodash';

let getCurrentDate = function() {
  let date = new Date();
  return date.toLocaleString("en-us");
}

const blank = {
  "_id" : "",
  "meta" : {
    "category": "0",
    "identifier": 0,
    "stage": "", // Public, Internal, Draft
    "prevVersions": [], //objectIDs
    "updatedBy": "", //user
    "lastModified": "",
    "usersWithAccess": [] //users (only used in Draft stage)
  },
  "date" : {
    "year" : "",
    "month" : "",
    "day" : ""
  },
  "indigenousName" : "",
  "baptismalName" : {
    "givenName" : "",
    "familyName" : ""
  },
  "tribe" : "",
  "origin" : "",
  "sex" : "",
  "age" : "",
  "mannerOfEnslavement" : "",
  "owner" : {
    "title" : "",
    "givenName" : "",
    "familyName" : ""
  },
  "stringLocation": "",
  "colonyState": "",
  "nationalContext": "",
  "partner" : {
    "inDatabase" : false,
    "givenName" : "",
    "familyName" : ""
  },
  "sourceType": "",
  "recordType": "",
  "additionalInfo": "",
  "researcherNotes": ""
}

let EntryViewModel = function(data) {
  let self = this;

  self = ko.mapping.fromJS(blank, {});
  ko.mapping.fromJS(data, {}, self);

  self.displayId = ko.computed(function() {
    return 'DISA-' + self.meta.category() + '-' + self.meta.identifier();
  });

  self.displayFirstName = ko.computed(function() {
    return self.indigenousName() || (self.baptismalName && self.baptismalName.givenName()) || '';
  });

  self.displayLastName = ko.computed(function() {
    return (self.baptismalName && self.baptismalName.familyName()) || '';
  });

  self.displayName = ko.computed(function() {
    return self.indigenousName() || (self.baptismalName && (self.baptismalName.givenName() + " " + self.baptismalName.familyName())) || 'No Name';
  });

  self.dateString = ko.computed(function() {
    return self.date.year() + " " + self.date.month() + " " + self.date.day();
  });

  self.save = function(userId, userGivenName) {
    self.meta.lastModified(getCurrentDate());
    console.log(userId, userGivenName);
    self.meta.usersWithAccess([userId]);
    self.meta.updatedBy(userGivenName);
    // TODO: change to user input
    self.meta.category("15");
    $.ajax({
      url: "/api/v1/entries",
      method: "PUT",
      data: {entry: ko.mapping.toJSON(self)}
    })
    .done((data) => {
      data = JSON.parse(data);
      console.log(data);
      self.meta.identifier(data.data.meta.identifier);
      console.log(data);
    });
    console.log("save");
  }

  self.changeStage = function(newStage) {
    console.log(newStage);
    self.meta.stage(newStage);
    $.ajax({
      url: "/api/v1/entries",
      method: "PUT",
      data: {entry: ko.mapping.toJSON(self)}
    })
    .done((data) => {
      console.log(data);
    });
    console.log("save");
  }

  return self;
}

export default EntryViewModel;
