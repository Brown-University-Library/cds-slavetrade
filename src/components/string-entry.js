ko.components.register('string-entry', {
  viewModel: function(params) {
    this.data = params.$raw.data;
    this.name = params.name;
  },
  template: '<section id="tribe">'
            + '<div class="form-group">'
              + '<label for="tribe">Tribe:</label>'
              + '<select data-bind="options: $parent.tribeOptions, optionsCaption: \'Select an item...\', value: "tribe" name="tribe" class="form-control">'
              + '</select>'
            + '</div>'
          + '</section>'
});

ko.applyBindings();
