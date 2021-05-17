'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_instructor');
// Local
const controller = require('./instructor.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/instructors`,
	});
	
	router
		.get('/:instructorId', controller.getOneById)
		.get('/:instructorName', controller.getOneByName)
		.get('/', controller.getAll)
		.post('/', controller.createOne);
	
	return router;
};
