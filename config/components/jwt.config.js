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
		JWT_ENABLE: joi.boolean(),
		JWT_SECRET: joi.string(),
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
	enableJWT: envVars.JWT_ENABLE || false,
	secretJWT: envVars.JWT_SECRET || 'jwt_secret',
};

module.exports = config;
