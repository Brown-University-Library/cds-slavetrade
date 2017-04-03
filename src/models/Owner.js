class Owner {
  constructor(data) {
    this.title = (data && data.title) || '';
    this.givenName = (data && data.givenName) || '';
    this.familyName = (data && data.familyName) || '';
  }
}

export default Owner;
