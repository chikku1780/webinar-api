'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_tag');
// Local
const controller = require('./tag.controller');
// Variables

module.exports = Router => {
	const router = new Router({
		prefix: `/tags`,
	});
	
	router
		.get('/:tagId', controller.getOneById)
		.get('/:tagName', controller.getOneByName)
		.get('/', controller.getAll)
		.post('/', controller.createOne);
	
	return router;
};
