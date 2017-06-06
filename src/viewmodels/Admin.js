import { getOptions, getUser } from '../utils/utils.js';

import name_banner from '../components/name-banner.js';
ko.components.register('name-banner', name_banner);
import admin_dashboard_element from '../components/admin-dashboard-element.js';
ko.components.register('admin-dashboard-element', admin_dashboard_element);
import new_user_card from '../components/new-user-card.js';
ko.components.register('new-user-card', new_user_card);

let AdminViewModel = function() {
  let self = this;

  self.sexOptions = ko.observableArray();
  self.monthOptions = ko.observableArray();
  self.tribeOptions = ko.observableArray();
  self.originOptions = ko.observableArray();
  self.mannerOfEnslavementOptions = ko.observableArray();
  self.racialTagOptions = ko.observableArray();

  self.addOption = function(category) {
    let listToAdd = self[category + 'Options'];
    listToAdd.push(ko.observable());
  }

  self.saveOptions = function(category, options) {
    let payload = {
      sex: ko.mapping.toJS(self.sexOptions),
      month: ko.mapping.toJS(self.monthOptions),
      tribe: ko.mapping.toJS(self.tribeOptions),
      origin: ko.mapping.toJS(self.originOptions),
      mannerOfEnslavement: ko.mapping.toJS(self.mannerOfEnslavementOptions),
      racialTag: ko.mapping.toJS(self.racialTagOptions)
    };
    payload[category] = ko.mapping.toJS(options);
    $.ajax({
      url: "/api/v1/options",
      method: "PUT",
      data: {options: JSON.stringify(payload)}
    })
    .done((data) => {
      //console.log(data);
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

    $.ajax({
      url: "/api/v1/users",
      method: "POST",
      data: {user: JSON.stringify(payload)}
    })
    .done((data) => {
      //console.log(data);
      self.username("");
      self.givenName("");
      self.familyName("");
      self.password("");
      self.role("");
    });
    //console.log("save");
  }

  // initializing data
  getOptions((options) => {
    for (let i = 0; i < options.sex.length; ++i) {
      console.log("working", options.sex[i]);
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

  self.userGivenName = ko.observable();
  self.userId = ko.observable();
  getUser((user) => {
    self.userGivenName(user.givenName);
    self.userId(user._id);
  });

  console.log(self.sexOptions()[0]);
}

ko.applyBindings(new AdminViewModel());
