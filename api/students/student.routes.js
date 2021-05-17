'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_student');
// Local
const controller = require('./student.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/students`,
	});
	
	router
		.get('/:studentId', controller.getOneById)
		.get('/:studentName', controller.getOneByName)
		.get('/', controller.getAll)
		.post('/', controller.createOne);
	
	return router;
};
