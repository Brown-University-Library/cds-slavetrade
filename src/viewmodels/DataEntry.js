import _ from 'lodash';
import {_entries, users} from '../Data.js'
import Entry from '../viewmodels/Entry.js';
const uuidV4 = require('uuid/v4');
const base32 = require('base32');

const DRAFT = "Draft",
      INTERNAL = "Internal",
      PUBLIC = "Public";

let getEntries = function(callback) {
  // TODO: get entries from server
  callback(_entries);
}

let DataEntryViewModel = function() {
  let self = this;

  let draftEntries = [];
  let internalEntries = [];
  let publicEntries = [];
  self.entries = ko.observableArray([]);

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
  });

  self.showHome = ko.observable(true);
  self.editEntry = ko.observable(null);
  self.copyOfEntryToEdit = null;

  self.getEntries = function(stage) {
    return ko.utils.arrayFilter(self.entries(), (entry) => {
      return entry().meta.stage() == stage;
    });
  }

  // TODO: get from auth data
  self.user = ko.observable(_.find(users, {_id: "123"}));

  self.edit = function(entry) {
    // entry argument is not observable

    // TODO: figure out how to search all entries
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
    entryToSave().save();
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
    let entryJS = ko.mapping.toJS(self.entries()[0]);
    let entry = ko.observable(new Entry(entryJS));
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
