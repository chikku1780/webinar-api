'use strict';
// Global
const log = require('debug-level').log('webinar-api:database');
// const mongoose = require('koa-mongoose');
const mongoose = require('@south-paw/koa-mongoose');
// Local
const {databaseConfig} = require('../config').database || {};
const _schemas = require('../schemas')();
// Variables
const databaseConfigMongo = databaseConfig.mongodb || {};

const databaseMiddleware = {};

databaseMiddleware.mongooseConnection = () => {
	const mongooseOptions = {
		// mongoose: require('mongoose-q')(),

		host: databaseConfigMongo.host || '127.0.0.1',
		user: databaseConfigMongo.user || '',
		pass: databaseConfigMongo.password || '',
		port: databaseConfigMongo.port || 27017,
		database: databaseConfigMongo.database || 'test',

		schemas: _schemas,

		mongoOptions: Object.assign({
			// these are the default middleware options, see https://mongoosejs.com/docs/connections.html#options
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			// reconnectTries: Number.MAX_SAFE_INTEGER, // Never stop trying to reconnect
			// reconnectInterval: 500, // Reconnect every 500ms
			poolSize: 10, // Maintain up to 10 socket connections
			bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
			connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
			native_parser: true,
		}, databaseConfigMongo.options || {}) || {},

		events: {
			// see https://mongoosejs.com/docs/api.html#connection_Connection-readyState
			error: () => log.error('mongoose: error'),
			connected: () => log.log('mongoose: connected'),
			connecting: () => log.log('mongoose: connecting'),
			disconnecting: () => log.log('mongoose: disconnecting'),
			disconnected: () => log.log('mongoose: disconnected'),
		},

		useDefaultErrorHandler: false, // enable or disable the default error handler
	};
	return mongoose(mongooseOptions);
};

module.exports = databaseMiddleware;
