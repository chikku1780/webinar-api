'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_subject');
// Local
const controller = require('./subject.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/subjects`,
	});
	
	router
		.get('/:subjectId', controller.getOneById)
		.get('/:subjectName', controller.getOneByName)
		.get('/', controller.getAll)
		.post('/', controller.createOne);
	
	return router;
};
