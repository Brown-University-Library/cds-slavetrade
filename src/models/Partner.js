class Partner {
  constructor(data) {
    this.inDatabase = (data && data.title) || false;
    this.givenName = (data && data.givenName) || '';
    this.familyName = (data && data.familyName) || '';
  }
}

export default Partner;
