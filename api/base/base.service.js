'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_base');
// Local
const generateId = require('../../utils/generateId.util');
// Variables
// let BaseModel;

const service = {};

class BaseService {
	constructor(model) {
		this.model = model;
	}

	getModel() {
		return this.model;
	}

	setModel(model) {
		this.model = model;
	}

}

module.exports = BaseService;
