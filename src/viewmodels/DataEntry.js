import _ from 'lodash';
import {_entries, users} from '../Data.js'
import Entry from '../viewmodels/Entry.js';

const DRAFT = "Draft",
      INTERNAL = "Internal",
      PUBLIC = "Public";

let getEntries = function(callback) {
  // TODO: get entries from server
  console.log(_entries);
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
    console.log("called", entries);
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

    console.log("test", self.entries());
  });

  self.showHome = ko.observable(true);
  self.editEntry = ko.observable(null);
  self.copyOfEntryToEdit = null;

  self.getEntries = function(stage) {
    console.log(stage);
    return ko.utils.arrayFilter(self.entries(), (entry) => {
      console.log(entry());
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
    // find the entry that was edited
    let entry = ko.utils.arrayFirst(self.entries(), (item) => {
      return item()._id() == self.copyOfEntryToEdit._id;
    });
    // set the data in entry to be the old data
    entry(new Entry(self.copyOfEntryToEdit));
    // reset the old data to null
    self.copyOfEntryToEdit = null;
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
}

ko.applyBindings(new DataEntryViewModel());
