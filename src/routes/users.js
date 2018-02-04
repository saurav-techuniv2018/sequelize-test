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
  {
    path: '/users/{id}',
    method: 'PATCH',
    handler: (request, response) => {
      const { id } = request.params;

      models.users
        .findOne({
          where: {
            id: Number(id),
          },
        })
        .then((user) => {
          if (user === null) {
            throw new Error(`Could not find user with id: ${id}.`);
          }

          return user.updateAttributes({
            firstName: request.payload.firstName || user.firstName,
            lastName: request.payload.lastName || user.lastName,
          });
        })
        .then(() => {
          response({
            statusCode: 204,
          });
        }, (reason) => {
          response({
            data: { reason: reason.message },
            statusCode: 404,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Could not update user attributes.',
            },
            statusCode: 500,
          });
        });
    },
  },
  {
    path: '/users/{id}',
    method: 'DELETE',
    handler: (request, response) => {
      const id = Number(request.params.id);

      models.users
        .findOne({
          where: { id },
        })
        .then(
          () => models.users.destroy({
            where: {
              id,
            },
          }),
          () => response({
            data: {
              reason: `Could not find user with id: ${id}.`,
            },
            statusCode: 404,
          }),
        )
        .then(() => response({
          statusCode: 204,
        }))
        .catch(() => response({
          data: {
            reason: 'Could not delete user.',
          },
          statusCode: 500,
        }));
    },
  },
];
