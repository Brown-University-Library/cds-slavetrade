import template from '../views/entry.html';
import Data from '../Data.js';
import _ from 'lodash';

let getCurrentDate = function() {
  let date = new Date();
  return date.toLocaleString("en-us");
}

let EntryViewModel = function(data) {
  let self = this;

  self = ko.mapping.fromJS(data, {});

  self.displayName = ko.computed(function() {
    return self.indigenousName() || (self.baptismalName && (self.baptismalName.givenName() + " " + self.baptismalName.familyName())) || 'No Name';
  });

  self.save = function() {
    console.log(self.stringLocation);
    self.meta.lastModified(getCurrentDate());
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
