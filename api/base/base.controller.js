'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_base');
// Local
const BaseService = require('./base.service');
// Variables

const controller = {};

class BaseController {
	constructor({name, prefix, modelName}) {
		this.name = name;
		this.prefix = prefix;
		this.modelName = modelName;

	}

	async getServerStatus(ctx) {
		let self = this;
		try {
			ctx.status = 200;
			ctx.body = 'success';
		} catch (err) {
			return self.errorHandler(ctx, err);
		}

	};

	errorHandler(ctx, err, errorStatus) {
		let self = this;
		ctx.status = errorStatus || 400;
		ctx.body = {
			status: 'Error',
			message: err.message || err.stack || '',
		};
		return ctx;
	};

}

module.exports = BaseController;
