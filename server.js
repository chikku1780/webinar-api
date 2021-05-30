'use strict';
// Global
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')(/* Add your cors option */);
const helmet = require('koa-helmet')(/* Add your security option */);
const logger = require('koa-logger')();
const koaBody = require('koa-body');
const jwt = require('koa-jwt');
const json = require('koa-json')();
const serve = require('koa-static');
const respond = require('koa-respond');

const fs = require('fs');
const os = require('os');
const path = require('path');
const log = require('debug-level').log('webinar-api');

// Local
const errorMiddleware = require('./middleware/error.middleware');
const utilMiddleware = require('./middleware/util.middleware');
const jwtMiddleware = require('./middleware/jwt.middleware');
const databaseMiddleware = require('./middleware/database.middleware');
const applyApiMiddleware = require('./api');
const {isDevelopment} = require('./config').server || {};

// Variables
const server = new Koa();

if (isDevelopment) {
	server.use(logger);
}

server.use(serve(path.join(__dirname, '/public')));

const logRequest = message => async (ctx, next) => {
	log.log(message);
	await next();
	log.log(message + ' DONE !');
};

const logContext = message => async (ctx, next) => {
	log.log(ctx);
	await next();
};

jwtMiddleware(server);

server
	// .use(logContext)
	.use(utilMiddleware.ignoreAssets)
	.use(utilMiddleware.appendResponseTimeToHeaders)
	.use(errorMiddleware.errorHandler)
	.use(errorMiddleware.custom401)
	.use(helmet)
	.use(compress)
	.use(cors)
	// .use(bodyParser)
	.use(koaBody())
	.use(json)
	.use(databaseMiddleware.mongooseConnection())
	.use(respond())
;


applyApiMiddleware(server);

module.exports = server;
