'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_course');
// Local
const controller = require('./course.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/courses`,
	});
	
	router
		.get('/:courseId', controller.getOneById)
		.get('/:courseName', controller.getOneByName)
		.get('/', controller.getAll)
		.post('/', controller.createOne);
	
	return router;
};
