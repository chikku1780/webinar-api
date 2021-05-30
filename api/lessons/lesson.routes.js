'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_lesson');
// Local
const controller = require('./lesson.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/lessons`,
	});
	
	router
		.get('/:lessonId', controller.getOneById)
		.get('/:lessonName', controller.getOneByName)
		.get('/', controller.getAll)
		.post('/', controller.createOne);
	
	return router;
};
