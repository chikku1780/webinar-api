'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_webinar');
// Local
const controller = require('./webinar.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/webinars`,
	});
	
	router
		.get('/:webinarId', controller.getOneById)
		.get('/:webinarName', controller.getOneByName)
		.get('/', controller.getAll)
		.post('/', controller.createOne);
	
	return router;
};
