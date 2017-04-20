const Hapi = require('hapi');
const _ = require('lodash');
const Path = require('path');
const routes = require('./routes');
const Auth = require('./auth');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });

_.forEach(routes, (route) => {
  server.route(route);
});

server.register([require('inert'), require('hapi-auth-basic')], (err) => {
  if (err) {
    throw err;
  }

  server.auth.strategy('simple', 'basic', true, { validateFunc: Auth.validate });
  // request.auth.credentials.givenName

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.resolve(__dirname, '../dist/client'),
        index: "home.html"
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/admin',
    config: {
      pre: [
        {
          method: function(request, reply) {
            return reply(request.auth.credentials.role == Auth.ADMIN);
          },
          assign: "isAdmin",
          failAction: "error"
        }
      ],
      handler: {
        file: function (request) {
          if (request.pre.isAdmin) {
            return Path.resolve(__dirname, '../dist/client', 'admin.html');
          }
          return Path.resolve(__dirname, '../dist/client', 'not-admin.html');
        }
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
