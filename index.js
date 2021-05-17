'use strict';
// Global
const http = require('http');
const server = require('./server');
const log = require('debug-level').log('webinar-api');
// Local

// Variables
const {serverConfig} = require('./config').server || {};

async function bootstrap() {
	/**
	 * Add external services init as async operations (db, redis, etc...)
	 * e.g.
	 * await sequelize.authenticate()
	 */
	return http.createServer(server.callback()).listen(serverConfig.port);
}

bootstrap()
	.then(server =>
		log.info(`🚀 Server listening on port ${server.address().port}!`),
	)
	.catch(err => {
		setImmediate(() => {
			log.error('Unable to run the server because of the following error:');
			log.error(err);
			process.exit();
		});
	});
