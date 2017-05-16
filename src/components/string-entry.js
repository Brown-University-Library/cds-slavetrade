import string_entry_template from './string-entry.html';

export default {
  viewModel: function(params) {
    this.data = params.data;
    this.name = params.name;
    this.displayName = params.displayName;
  },
  template: string_entry_template
}
