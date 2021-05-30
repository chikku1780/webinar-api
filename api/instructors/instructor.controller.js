'use strict';

// Global
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const log = require('debug-level').log('webinar-api:api_instructor');
// Local
const InstructorService = require('./instructor.service');
// Variables
const {secretJWT} = require('../../config').jwt || '';

const controller = {};

class InstructorController {
	constructor({name, prefix, modelName}) {
		this.name = name;
		this.prefix = prefix;
		this.modelName = modelName;

		this.createInstructor = this.createInstructor.bind(this);
		this.loginInstructor = this.loginInstructor.bind(this);
		this.me = this.me.bind(this);
		this.getInstructorById = this.getInstructorById.bind(this);
		this.getInstructorByUsername = this.getInstructorByUsername.bind(this);
		this.getInstructorByName = this.getInstructorByName.bind(this);
		this.getInstructors = this.getInstructors.bind(this);
		this.errorHandler = this.errorHandler.bind(this);
	}

	async createInstructor(ctx, next) {
		let self = this;
		try {
			let body = ctx.request && ctx.request.body || {};
			if (!body.username || !body.password || !body.email || !body.name) {
				let error = {
					message: 'Expected an object with username, password, email, name but got: ' + JSON.stringify(body),
				};
				return self.errorHandler(ctx, error);
			}
			body.password = await bcrypt.hash(body.password, 5);
			let instructorUsername = body.username;
			let service = new InstructorService();
			const model = ctx.model && ctx.model(this.modelName);
			service.setModel(model);
			const instructor = await service.getInstructorByUsername(instructorUsername);
			ctx.assert(!instructor, 406, 'The instructor already exists!');
			const Instructor = await service.createInstructor(body);
			ctx.status = 201;
			ctx.body = Instructor;
		} catch (err) {
			return self.errorHandler(ctx, err);
		}
	};

	async loginInstructor(ctx, next) {
		let self = this;
		try {
			let body = ctx.request && ctx.request.body;
			if (!body.username || !body.password) {
				let error = {
					message: 'Expected an object with username, password',
				};
				return self.errorHandler(ctx, error);
			}
			let instructorUsername = body.username;
			let service = new InstructorService();
			const model = ctx.model && ctx.model(this.modelName);
			service.setModel(model);
			const instructor = await service.getInstructorByUsername(instructorUsername);
			if (!instructor) {
				let error = {
					message: 'No user found',
				};
				return self.errorHandler(ctx, error);
			}
			let {password} = instructor;
			let passwordCheck = await bcrypt.compare(body.password, password);
			if (!passwordCheck) {
				let error = {
					message: 'Bad password',
				};
				return self.errorHandler(ctx, error, 401);
			}
			let {id, username, email, name} = instructor;
			ctx.body = {
				token: jsonwebtoken.sign({
					data: {id, username, email, name},
					exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
				}, secretJWT),
			}
		} catch (err) {
			return self.errorHandler(ctx, err);
		}
	};

	async me(ctx, next) {
		let self = this;
		try {
			let _user = ctx.state && ctx.state.user;
			ctx.body = _user || {};
		} catch (err) {
			return self.errorHandler(ctx, err);
		}
	};

	async getInstructorById(ctx) {
		let self = this;
		try {
			const {instructorId} = ctx.params;
			let service = new InstructorService();
			const model = ctx.model && ctx.model(this.modelName);
			service.setModel(model);
			const instructor = await service.getInstructorById(instructorId);
			ctx.assert(instructor, 404, "The requested instructor doesn't exist");
			ctx.status = 200;
			ctx.body = instructor;
		} catch (err) {
			return self.errorHandler(ctx, err);
		}
	};

	async getInstructorByUsername(ctx) {
		let self = this;
		try {
			const {instructorUsername} = ctx.params;
			let service = new InstructorService();
			const model = ctx.model && ctx.model(this.modelName);
			service.setModel(model);
			const instructor = await service.getInstructorByUsername(instructorUsername);
			ctx.assert(instructor, 404, "The requested instructor doesn't exist");
			ctx.status = 200;
			ctx.body = instructor;
		} catch (err) {
			return self.errorHandler(ctx, err);
		}
	};

	async getInstructorByName(ctx) {
		let self = this;
		try {
			const {instructorName} = ctx.params;
			let service = new InstructorService();
			const model = ctx.model && ctx.model(this.modelName);
			service.setModel(model);
			const instructor = await service.getInstructorByName(instructorName);
			ctx.assert(instructor, 404, "The requested instructor doesn't exist");
			ctx.status = 200;
			ctx.body = instructor;
		} catch (err) {
			return self.errorHandler(ctx, err);
		}
	};

	async getInstructors(ctx) {
		let self = this;
		try {
			let service = new InstructorService();
			const model = ctx.model && ctx.model(this.modelName);
			service.setModel(model);
			let instructors = await service.getInstructors();
			ctx.status = 200;
			ctx.body = instructors;
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

module.exports = InstructorController;
