'use strict';
// Global
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')(/* Add your cors option */);
const helmet = require('koa-helmet')(/* Add your security option */);
const logger = require('koa-logger')();
const koaBody = require('koa-body');
const serve = require('koa-static');

const fs = require('fs');
const os = require('os');
const path = require('path');
const log = require('debug-level').log('webinar-api');

// Local
const errorMiddleware = require('./middleware/error.middleware');
const utilMiddleware = require('./middleware/util.middleware');
const applyApiMiddleware = require('./api');
const {isDevelopment} = require('./config');

// Variables
const server = new Koa();

/**
 * Add here only development middlewares
 */
if (isDevelopment) {
	server.use(logger);
}

/**
 * Pass to our server instance middlewares
 */

server.use(serve(path.join(__dirname, '/public')));
server
	.use(errorMiddleware.errorHandler)
	.use(utilMiddleware.ignoreAssets(logger))
	.use(helmet)
	.use(compress)
	.use(cors)
	.use(bodyParser)
	.use(koaBody({ multipart: true }));

/**
 * Apply to our server the api router
 */
applyApiMiddleware(server);

module.exports = server;
