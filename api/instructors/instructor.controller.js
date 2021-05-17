'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_instructor');
// Local
const service = require('./instructor.service');
// Variables

const controller = {};

controller.getOneById = async ctx => {
	try {
		const {instructorId} = ctx.params;
		const instructor = await service.findById(instructorId);
		ctx.assert(instructor, 404, "The requested instructor doesn't exist");
		ctx.status = 200;
		ctx.body = instructor;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getOneByName = async ctx => {
	try {
		const {instructorName} = ctx.params;
		const instructor = await service.findByName(instructorName);
		ctx.assert(instructor, 404, "The requested instructor doesn't exist");
		ctx.status = 200;
		ctx.body = instructor;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getAll = async ctx => {
	try {
		ctx.status = 200;
		ctx.body = await service.getAll();
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
	
};

controller.createOne = async ctx => {
	try {
		let body = ctx.request.body;
		const {name} = body;
		ctx.assert(name, 400, 'The instructor info is malformed!');
		const instructor = await service.findByName(name);
		ctx.assert(instructor, 400, 'The instructor already exists!');
		const createdUser = await service.create(body);
		ctx.status = 201;
		ctx.body = createdUser;
	} catch (e) {
		return controller.errorHandler(ctx, err);
	}
};

controller.errorHandler = (ctx, err) => {
	ctx.status = 400;
	ctx.body = {
		status: 'Error',
		message: err.message || '',
	};
	return ctx;
};

module.exports = controller;
