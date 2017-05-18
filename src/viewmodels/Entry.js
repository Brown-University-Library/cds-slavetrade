let getCurrentDate = function() {
  let date = new Date();
  return date.toLocaleString("en-us");
}

const blank = require('../BlankEntry.js');

let EntryViewModel = function(data) {
  let self = this;

  self = ko.mapping.fromJS(blank, {});
  ko.mapping.fromJS(data, {}, self);

  self.displayId = ko.computed(function() {
    return 'DISA-' + self.meta.category() + '-' + self.meta.identifier();
  });

  self.displayFirstName = ko.computed(function() {
    if (self.names.index && self.names.index() != -1) {
      return (self.names && self.names.values && self.names.index && self.names.values()[self.names.index()] && self.names.values()[self.names.index()].firstName()) || 'No Name';
    } else {
      return 'No Name';
    }
  });

  self.displayLastName = ko.computed(function() {
    if (self.names.index && self.names.index() != -1) {
      return (self.names && self.names.values && self.names.index && self.names.values()[self.names.index()] && self.names.values()[self.names.index()].lastName()) || 'No Name';
    } else {
      return 'No Name';
    }
  });

  // self.displayName = ko.computed(function() {
  //   return self.indigenousName() || (self.baptismalName && (self.baptismalName.givenName() + " " + self.baptismalName.familyName())) || 'No Name';
  // });

  self.dateString = ko.computed(function() {
    return (self.date.year && self.date.year()) + " " + (self.date.month && self.date.month()) + " " + (self.date.day && self.date.day());
  });

  self.addName = function() {
    console.log(self.names, self.names.values());
    self.names.values.push({firstName:ko.observable(""),lastName:ko.observable("")});
  }

  self.deleteName = function(name) {
    let length = self.names.values().length;
    if (length > 1) {
      self.names.values.remove(name);
      length = self.names.values().length;
      if (self.names.index() >= length) {
        self.names.index(length - 1);
      }
    } else {
      alert("Cannot have 0 names");
    }
  }

  self.makePrimaryName = function(name) {
    self.names.index(self.names.values.indexOf(name));
  }

  self.save = function(userId, userGivenName) {
    self.meta.lastModified(getCurrentDate());
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
      //console.log(data);
      data = JSON.parse(data);
      self.meta.identifier(data.data.meta.identifier);
    });
    //console.log("save");
  }

  self.delete = function(deleteStage) {
    self.meta.stage(deleteStage);
    $.ajax({
      url: "/api/v1/entries",
      method: "PUT",
      data: {entry: ko.mapping.toJSON(self)}
    })
    .done((data) => {
      //console.log(data);
      data = JSON.parse(data);
    });
    //console.log("save");
  }

  self.changeStage = function(newStage) {
    //console.log(newStage);
    self.meta.stage(newStage);
    $.ajax({
      url: "/api/v1/entries",
      method: "PUT",
      data: {entry: ko.mapping.toJSON(self)}
    })
    .done((data) => {
      //console.log(data);
    });
    //console.log("save");
  }

  return self;
}

export default EntryViewModel;
