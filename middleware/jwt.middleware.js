'use strict';
// Global
const jwt = require('koa-jwt');
const fs = require('fs');
const path = require('path');
const log = require('debug-level').log('webinar-api:jwt_middleware');
// Local
// Variables
const {enableJWT, secretJWT} = require('../config').jwt || '';

function jwtMiddleware(server) {
	if (enableJWT) {
		server.use(jwt({
			secret: secretJWT
		}).unless({
			path: [/^\/public/, '/', '/api/v1/instructors/register', '/api/v1/instructors/login']
		}));
	}
}

module.exports = jwtMiddleware;
