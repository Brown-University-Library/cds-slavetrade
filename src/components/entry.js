import entry_template from './entry.html';

export default {
  viewModel: function(params) {
    this.data = params.data;
  },
  template: entry_template
}
