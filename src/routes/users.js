const models = require('../../models');

module.exports = [
  {
    path: '/users',
    method: 'POST',
    handler: (request, response) => {
      models.users.create({
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
      })
        .then((result) => {
          response({
            data: {
              id: result.dataValues.id,
              firstName: result.dataValues.firstName,
              lastName: result.dataValues.lastName,
            },
            statusCode: 201,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Could not insert new user.',
            },
            statusCode: 500,
          });
        });
    },
  },
  {
    path: '/users',
    method: 'GET',
    handler: (request, response) => {
      models.users.findAll()
        .then(result => result.map(row => ({
          id: row.id,
          firstName: row.firstName,
          lastName: row.lastName,
        })))
        .then((users) => {
          response({
            data: users,
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve users.',
            },
            statusCode: 500,
          });
        });
    },
  },
];
