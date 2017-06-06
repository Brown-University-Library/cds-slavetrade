import admin_dashboard_element_template from './admin-dashboard-element.html';

export default {
  viewModel: function(params) {
    this.title = params.title;
    this.options = params.options;
    this.name = params.name;
    this.nameModal = this.name + 'Modal';
    this.nameModalReference = "#" + this.nameModal;
    this.nameModalLabel = this.nameModal + 'Label';
  },
  template: admin_dashboard_element_template
}
