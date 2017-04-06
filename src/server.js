const Hapi = require('hapi');
const _ = require('lodash');
const Path = require('path');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });

_.forEach(routes, (route) => {
  server.route(route);
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.resolve(__dirname, '../dist'),
        index: "home.html"
      }
    }
  })

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  })
});
