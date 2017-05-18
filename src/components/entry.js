import entry_template from './entry.html';

export default {
  viewModel: function(params) {
    console.log("tet");
    console.log(params);
    console.log(params.data);
    this.data = params.data;
  },
  template: entry_template
}
