class Date {
  constructor(data) {
    this.year = ko.observable((data && data.year) || '');
    this.month = ko.observable((data && data.month) || '');
    this.day = ko.observable((data && data.day) || '');
  }
}

export default Date;
