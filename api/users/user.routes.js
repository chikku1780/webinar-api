'use strict';
// Global
const log = require('debug-level').log('webinar-api');
// Local
const controller = require('./user.controller');
// Variables

module.exports = Router => {
  const router = new Router({
    prefix: `/users`,
  });

  router
    .get('/:userId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
