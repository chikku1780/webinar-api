'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_lesson');
// Local
const service = require('./lesson.service');
// Variables

const controller = {};

controller.getOneById = async ctx => {
	try {
		const {lessonId} = ctx.params;
		const lesson = await service.findById(lessonId);
		ctx.assert(lesson, 404, "The requested lesson doesn't exist");
		ctx.status = 200;
		ctx.body = lesson;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getOneByName = async ctx => {
	try {
		const {lessonName} = ctx.params;
		const lesson = await service.findByName(lessonName);
		ctx.assert(lesson, 404, "The requested lesson doesn't exist");
		ctx.status = 200;
		ctx.body = lesson;
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
		ctx.assert(name, 400, 'The lesson info is malformed!');
		const lesson = await service.findByName(name);
		ctx.assert(lesson, 400, 'The lesson already exists!');
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
