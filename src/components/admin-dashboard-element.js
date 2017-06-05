import admin_dashboard_element_template from './admin-dashboard-element.html';

export default {
  viewModel: function(params) {
    this.underText = params.underText;
    this.userGivenName = params.userGivenName;
  },
  template: admin_dashboard_element_template
}
