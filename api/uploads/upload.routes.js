'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_student');
// Local
const controller = require('./upload.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/uploads`,
	});
	
	router
		.post('/', controller.uploadFile);
	
	return router;
};
