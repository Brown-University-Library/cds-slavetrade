import entry_template from './entry.html';

export default {
  viewModel: function(params) {
    this.data = params.data;
    this.parent = params.parent;
    console.log(params.parent);
  },
  template: entry_template
}
