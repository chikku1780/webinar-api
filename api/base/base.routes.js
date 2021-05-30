'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_base');
// Local
const BaseController = require('./base.controller');
// Variables
let name = 'base';
let prefix = '';
let modelName = 'test';
const controller = new BaseController({name, prefix, modelName});

module.exports = Router => {
	const router = new Router({
		prefix: prefix,
	});

	router
		.get('/', controller.getServerStatus)
	;

	return router;
};
