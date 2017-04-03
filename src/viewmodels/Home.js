import _ from 'lodash';
import {entries, users} from '../Data.js'
import EntryComponent from '../viewmodels/Entry.js';
EntryComponent.register();

let HomeViewModel = function() {
  let self = this;

  let draftEntries = _.find(entries, {"meta" : {"stage": "Draft"}});
  let internalEntries = _.find(entries, {"meta": {"stage": "Internal"}});
  let publicEntries = _.find(entries, {"meta": {"stage": "Public"}});

  self.editEntry = ko.observable(null);

  window.draftEntries = draftEntries;
  console.log(draftEntries);

  self.draftEntries = ko.observableArray(draftEntries);
  self.internalEntries = ko.observableArray(internalEntries);
  self.publicEntries = ko.observableArray(publicEntries);
  self.user = ko.observable(_.find(users, {_id: "123"}));

  self.edit = function(entry) {
    console.log(entry);
    self.editEntry(_.find(entries, {_id: entry}));
  }
}

ko.applyBindings(new HomeViewModel());
