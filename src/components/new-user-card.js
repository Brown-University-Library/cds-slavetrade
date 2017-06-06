import new_user_card_template from './new-user-card.html';

export default {
  viewModel: function(params) {
    this.username = params.username;
    this.givenName = params.givenName;
    this.familyName = params.familyName;
    this.password = params.password;
    this.role = params.role;
  },
  template: new_user_card_template
}
