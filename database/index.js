const mongoose = require('mongoose');
const log = require('debug-level').log('webinar-api');

// Local
const {databaseConfig} = require('../config').database || {};
// Variables
const databaseConfigMongo = databaseConfig.mongodb || {};

const databaseConnections = {};

databaseConnections.connectToMongoDB_Main = async () => {
	let mongoConnectionString = await prepareMongoConnectionString(databaseConfigMongo);
	const connection = mongoose.connect(mongoConnectionString);
	connection.once('open', () => {
		log.info('connected to database');
	});
	connection.on('error', log.error);
};

async function prepareMongoConnectionString(mongoConfig) {
	mongoConfig = mongoConfig || {};
	return '';
}

module.exports = databaseConnections;
