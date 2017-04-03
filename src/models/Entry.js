import Date from './Date';
import BaptismalName from './BaptismalName';
import Owner from './Owner';
import Parnter from './Partner';

class Entry {
  constructor(data) {
    let self = this;

    self.data = ko.mapping.fromJSON(data);
    console.log(data);


  }
}

export default Entry;
