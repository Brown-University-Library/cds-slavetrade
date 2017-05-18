import dashboard_table_template from './dashboard-table.html';

export default {
  viewModel: function(params) {
    this.id = params.id;
    this.displayName = params.displayName;
    this.rows = params.rows;
    this.edit = params.edit;
    this.sort = params.sort;
    this.sortName = params.sortName;
  },
  template: dashboard_table_template
}
