'use strict';
// Global
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const log = require('debug-level').log('webinar-api:api');
// Local
// Variables
const {serverConfig} = require('../config').server || {};
const baseName = path.basename(__filename);

function applyApiMiddleware(app) {
	const router = new Router({
		prefix: `/api/${serverConfig.apiVersion || 'v1'}`,
	});
	
	// Require all the folders and create a sub-router for each feature api
	fs.readdirSync(__dirname)
		.filter(file => file.indexOf('.') !== 0 && file !== baseName)
		.forEach(file => {
			const api = require(path.join(__dirname, file))(Router);
			// log.log('file > %s  - api > %o', file, api);
			router.use(api.routes());
		});
	
	app.use(router.routes()).use(router.allowedMethods());
}

module.exports = applyApiMiddleware;
