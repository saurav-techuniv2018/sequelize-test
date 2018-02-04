const allRoutes = require('../../src/routes');
const server = require('../../src/server');

describe('server', () => {
  test('should contain correct number of routes', () => {
    expect(allRoutes.length).toBe(server.table('localhost')[0].table.length);
  });
});
