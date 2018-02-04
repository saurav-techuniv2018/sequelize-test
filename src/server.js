const hapi = require('hapi');

const allRoutes = require('./routes');

const server = new hapi.Server();
const port = Number(process.env.PORT) || Number(process.argv[2]) || 8080;

server.connection({
  host: 'localhost',
  port,
});

server.route(allRoutes);

if (!module.parent) {
  server.start()
    .then(() => {
      console.log(`Server running at: ${server.info.uri}`);
    })
    .catch((error) => { throw error; });
}

module.exports = server;
