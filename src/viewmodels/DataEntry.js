import _ from 'lodash';
import {_entries, users} from '../Data.js'
import Entry from '../viewmodels/Entry.js';
const uuidV4 = require('uuid/v4');
const base32 = require('base32');

const DRAFT = "Draft",
      INTERNAL = "Internal",
      PUBLIC = "Public";

let getEntries = function(callback) {
  // NOTE: $ (jQuery) is in scope because it is in a script tag in home.html
  // this should probably be changed, maybe use bower?

  $.get('/api/v1/entries', (data) => {
    console.log(data);
    let entries = JSON.parse(data);
    callback(entries);
  });
}

let getOptions = function(callback) {
  // NOTE: $ (jQuery) is in scope because it is in a script tag in home.html
  // this should probably be changed, maybe use bower?

  $.get('/api/v1/options', (data) => {
    console.log(data);
    let options = JSON.parse(data);
    callback(options);
  });
}

let getUser = function(callback) {
  $.get('/api/v1/users/me', (data) => {
    console.log(data);
    let user = JSON.parse(data);
    callback(user);
  });
}

let DataEntryViewModel = function() {
  let self = this;

  let draftEntries = [];
  let internalEntries = [];
  let publicEntries = [];
  self.entries = ko.observableArray();
  self.sexOptions = ko.observableArray();
  self.monthOptions = ko.observableArray();
  self.tribeOptions = ko.observableArray();
  self.originOptions = ko.observableArray();
  self.mannerOfEnslavementOptions = ko.observableArray();
  self.racialTagOptions = ko.observableArray();
  self.addOption = function(category) {
    console.log("hi");
    console.log(self, category, self[category + 'Options']);
    let listToAdd = self[category + 'Options'];
    listToAdd.push(ko.observable());
  }

  self.saveOptions = function() {
    let payload = {
      sex: ko.mapping.toJS(self.sexOptions),
      month: ko.mapping.toJS(self.monthOptions),
      tribe: ko.mapping.toJS(self.tribeOptions),
      origin: ko.mapping.toJS(self.originOptions),
      mannerOfEnslavement: ko.mapping.toJS(self.mannerOfEnslavementOptions),
      racialTag: ko.mapping.toJS(self.racialTagOptions)
    };
    console.log(payload, JSON.stringify(payload));
    $.ajax({
      url: "/api/v1/options",
      method: "PUT",
      data: {options: JSON.stringify(payload)}
    })
    .done((data) => {
      console.log(data);
    });
    console.log("save");
  }

  self.deleteOption = function(category, option) {
    let listToRemove = self[category + 'Options'];
    listToRemove.remove((item) => {
      return item() == option;
    });
    self.saveOptions();
  }

  self.username = ko.observable();
  self.givenName = ko.observable();
  self.familyName = ko.observable();
  self.password = ko.observable();
  self.role = ko.observable();
  self.newUser = function() {
    let payload = {
      username: ko.mapping.toJS(self.username),
      password: ko.mapping.toJS(self.password),
      givenName: ko.mapping.toJS(self.givenName),
      familyName: ko.mapping.toJS(self.familyName),
      role: ko.mapping.toJS(self.role)
    };

    console.log(payload, JSON.stringify(payload));
    $.ajax({
      url: "/api/v1/users",
      method: "POST",
      data: {user: JSON.stringify(payload)}
    })
    .done((data) => {
      console.log(data);
      self.username("");
      self.givenName("");
      self.familyName("");
      self.password("");
      self.role("");
    });
    console.log("save");
  }

  // initializing data
  getEntries((entries) => {
    _.forEach(entries, (item) => {
      let entry = ko.observable(new Entry(item));
      self.entries.push(entry);
      // switch (item.meta.stage) {
      //   case "Draft":
      //     draftEntries.push(entry);
      //     break;
      //   case "Internal":
      //     internalEntries.push(entry);
      //     break;
      //   case "Public":
      //     publicEntries.push(entry);
      //     break;
      //   default:
      //     console.log(new Error("Stage not found"));
      //}
    });

    getOptions((options) => {
      for (let i = 0; i < options.sex.length; ++i) {
        self.sexOptions.push(ko.observable(options.sex[i]));
      }
      for (let i = 0; i < options.month.length; ++i) {
        self.monthOptions.push(ko.observable(options.month[i]));
      }
      for (let i = 0; i < options.tribe.length; ++i) {
        self.tribeOptions.push(ko.observable(options.tribe[i]));
      }
      for (let i = 0; i < options.origin.length; ++i) {
        self.originOptions.push(ko.observable(options.origin[i]));
      }
      for (let i = 0; i < options.mannerOfEnslavement.length; ++i) {
        self.mannerOfEnslavementOptions.push(ko.observable(options.mannerOfEnslavement[i]));
      }
      for (let i = 0; i < options.racialTag.length; ++i) {
        self.racialTagOptions.push(ko.observable(options.racialTag[i]));
      }
    });

    self.blank = new Entry({
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
    });
  });

  self.showHome = ko.observable(true);
  self.editEntry = ko.observable(null);
  self.copyOfEntryToEdit = null;

  self.getEntries = function(stage) {
    return ko.utils.arrayFilter(self.entries(), (entry) => {
      return entry().meta.stage() == stage;
    });
  }

  self.userGivenName = ko.observable();
  self.userId = ko.observable();
  getUser((user) => {
    console.log("use", user.givenName);
    self.userGivenName(user.givenName);
    self.userId(user._id);
  });

  self.edit = function(entry) {
    // entry argument is not observable

    let entryToEdit = ko.utils.arrayFirst(self.entries(), (item) => {
      return item()._id() == entry._id();
    });
    // needed to allow for "cancel" functionality
    self.copyOfEntryToEdit = ko.mapping.toJS(entryToEdit);
    // editEntry takes in the data, which is itself observable
    self.editEntry(entryToEdit());
    // get rid of the tables and welcome message from view
    self.showHome(false);
  }

  self.cancel = function() {
    if (self.copyOfEntryToEdit) {
      // find the entry that was edited
      let entry = ko.utils.arrayFirst(self.entries(), (item) => {
        return item()._id() == self.copyOfEntryToEdit._id;
      });
      // set the data in entry to be the old data
      entry(new Entry(self.copyOfEntryToEdit));
      // reset the old data to null
      self.copyOfEntryToEdit = null;
    } else {
      // new entry canceled
      // TODO: figure this out
    }
    // get rid of the edit form from view
    self.editEntry(null);
    // show the welcome message and tables again
    self.showHome(true);
  }

  self.save = function(entry) {
    // find the entry that was edited
    let entryToSave = ko.utils.arrayFirst(self.entries(), (item) => {
      return item()._id() == entry._id();
    });
    // have the entry viewmodel deal with sending data to server
    entryToSave().save(self.userId(), self.userGivenName());
    // get rid of the edit form from view
    self.editEntry(null);
    // show the welcome message and tables again
    self.showHome(true);
  }

  // hack-y function
  let resetObservables = function(object, defaultValue) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var property = object[key];
        if (ko.isWriteableObservable(property)) {
          property(defaultValue);
        } else if (property instanceof Object) {
          resetObservables(property, defaultValue);
        }
      }
    }
  }

  self.newEntry = function() {
    // little hack to get all the properties attached to the viewmodels
    // without needing to predefine all of them in a model.js file
    console.log(self, self.entries());
    // need edge case for empty entries
    let entryJS = ko.mapping.toJS(self.blank); //(self.entries() && self.entries()[0]));
    let entry = ko.observable(new Entry(entryJS));

    // NOTE: might not be needed now
    resetObservables(entry, "");

    // set the default stage
    entry().meta.stage(DRAFT);
    // generate a new ID
    entry()._id(base32.encode(uuidV4()));

    // add it to the array of entries
    // TODO: allow for cancel/delete
    self.entries.push(entry);

    // show the edit form
    self.editEntry(entry());
    // hide the tables and welcome message
    self.showHome(false);
  }
}

ko.applyBindings(new DataEntryViewModel());
