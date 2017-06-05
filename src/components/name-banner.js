import name_banner_template from './name-banner.html';

export default {
  viewModel: function(params) {
    this.underText = params.underText;
    this.userGivenName = params.userGivenName;
  },
  template: name_banner_template
}
