class BaptismalName {
  constructor(data) {
    this.givenName = (data && data.givenName) || '';
    this.familyName = (data && data.familyName) || '';
  }
}

export default BaptismalName;
