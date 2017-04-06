const Path = require('path');
const fs = require('fs');
const _ = require('lodash');

let routes = []

let normalizedPath = Path.join(__dirname);
let currentfile = Path.basename(__filename);

fs.readdirSync(normalizedPath).forEach((file) => {
  if (file !== currentfile) {
    let route = require(Path.join(__dirname, file));
    if (route instanceof Array) {
      _.forEach(route, (r) => {
        routes.push(r);
      });
    } else {
      routes.push(route);
    }
  }
});

module.exports = routes;
