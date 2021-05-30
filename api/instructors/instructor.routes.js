'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_instructor');
// Local
const InstructorController = require('./instructor.controller');
// Variables
let name = 'instructor';
let prefix = `/instructors`;
let modelName = 'instructors';
const controller = new InstructorController({name, prefix, modelName});

module.exports = Router => {
	const router = new Router({
		prefix: prefix,
	});

	router
		.post('/register', controller.createInstructor)
		.post('/login', controller.loginInstructor)
		.get('/me', controller.me)
		.get('/:instructorId', controller.getInstructorById)
		.get('/:instructorUsername', controller.getInstructorByUsername)
		.get('/:instructorName', controller.getInstructorByName)
		.get('/', controller.getInstructors)
		.post('/', controller.createInstructor);

	return router;
};
