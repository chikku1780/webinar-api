'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_subject');
// Local
const service = require('./subject.service');
// Variables

const controller = {};

controller.getOneById = async ctx => {
	try {
		const {subjectId} = ctx.params;
		const subject = await service.findById(subjectId);
		ctx.assert(subject, 404, "The requested subject doesn't exist");
		ctx.status = 200;
		ctx.body = subject;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getOneByName = async ctx => {
	try {
		const {subjectName} = ctx.params;
		const subject = await service.findByName(subjectName);
		ctx.assert(subject, 404, "The requested subject doesn't exist");
		ctx.status = 200;
		ctx.body = subject;
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
		ctx.assert(name, 400, 'The subject info is malformed!');
		const subject = await service.findByName(name);
		ctx.assert(subject, 400, 'The subject already exists!');
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
