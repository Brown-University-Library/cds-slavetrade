import text_entry_template from './text-entry.html';

export default {
  viewModel: function(params) {
    this.data = params.data;
    this.name = params.name;
    this.displayName = params.displayName;
  },
  template: text_entry_template
}
