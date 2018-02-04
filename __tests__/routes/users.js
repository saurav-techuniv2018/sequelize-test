const supertest = require('supertest');

const models = require('../../models');
const server = require('../../src/server');

const route = '/users';

describe(route, () => {
  beforeEach(() => {
    models.users.create({
      firstName: 'John',
      lastName: 'Allen',
    })
      .then(() => { })
      .catch(console.log);
  });
  afterEach(() => models.users.truncate());
  afterAll(() => models.close());

  describe('method POST', () => {
    test('should return a 201 created statusCode', (done) => {
      expect.assertions(1);
      supertest(server.listener)
        .post(route)
        .send({
          firstName: 'Saurav',
          lastName: 'Sahu',
        })
        .then((result) => {
          const { body } = result;
          expect(body.statusCode).toBe(201);
          done();
        })
        .catch(console.log);
    });
    test('should return the inserted user data', (done) => {
      expect.assertions(1);
      supertest(server.listener)
        .post(route)
        .send({
          firstName: 'Harrison',
          lastName: 'Wells',
        })
        .then((response) => {
          const { data } = response.body;
          expect(data).toEqual(expect.objectContaining({
            id: expect.any(Number),
            firstName: 'Harrison',
            lastName: 'Wells',
          }));
          done();
        })
        .catch(console.log);
    });
  });
  describe('method GET', () => {
    test('should return a 200 OK statusCode', (done) => {
      supertest(server.listener)
        .get(route)
        .then((response) => {
          const payload = response.body;
          expect(payload.statusCode).toBe(200);
          done();
        })
        .catch(console.log);
    });
    test('should return 1 user', (done) => {
      supertest(server.listener)
        .get(route)
        .then((response) => {
          const payload = response.body;
          expect(payload.data.length).toBe(1);
          done();
        })
        .catch((reason) => {
          console.log(reason.message);
        });
    });
    test('should return the correct user details', () => {
      supertest(server.listener)
        .get(route)
        .then((response) => {
          const { data } = response.body;
          const user = data[0];
          expect(user).objectContaining({
            id: expect.any(Number),
            firstName: 'John',
            lastName: 'Allen',
          });
        })
        .catch((reason) => {
          console.log(reason.message);
        });
    });
  });
});
