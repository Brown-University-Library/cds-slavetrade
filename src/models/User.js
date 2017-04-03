class User {
  constructor(data) {
    this.data = ko.mapping.fromJSON(data);
  }
}

export default User;
