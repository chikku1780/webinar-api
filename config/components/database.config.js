'use strict';
// Global
const joi = require('joi');
const log = require('debug-level').log('webinar-api:config');
// Local

// Variables
/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
	.object({
		MONGO_DB_USER: joi.string(),
		MONGO_DB_HOST: joi.string(),
		MONGO_DB_PASSWORD: joi
			.string()
			.optional()
			.empty(''),
		MONGO_DB_DATABASE: joi.string(),
		MONGO_DB_PORT: joi.number(),
	})
	.unknown()
	.required();

/**
 * Validate the env variables using joi.validate()
 */
const {error, value: envVars} = joi.validate(process.env, envSchema);
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

const config = {
	databaseConfig: {
		mongodb: {
			host: envVars.MONGO_DB_HOST || '127.0.0.1',
			user: envVars.MONGO_DB_USER || '',
			password: envVars.MONGO_DB_PASSWORD || '',
			database: envVars.MONGO_DB_DATABASE || 'testing',
			port: envVars.MONGO_DB_PORT || 27017,
			options: {},
		},
	},
};

module.exports = config;
