import options_entry_template from './options-entry.html';

export default {
  viewModel: function(params) {
    this.data = params.data;
    this.dropDownOptions = params.options;
    this.name = params.name;
    this.displayName = params.displayName;
  },
  template: options_entry_template
}
