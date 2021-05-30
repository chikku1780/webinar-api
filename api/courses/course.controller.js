'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_course');
// Local
const service = require('./course.service');
// Variables

const controller = {};

controller.getOneById = async ctx => {
	try {
		const {courseId} = ctx.params;
		const course = await service.findById(courseId);
		ctx.assert(course, 404, "The requested course doesn't exist");
		ctx.status = 200;
		ctx.body = course;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getOneByName = async ctx => {
	try {
		const {courseName} = ctx.params;
		const course = await service.findByName(courseName);
		ctx.assert(course, 404, "The requested course doesn't exist");
		ctx.status = 200;
		ctx.body = course;
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
		ctx.assert(name, 400, 'The course info is malformed!');
		const course = await service.findByName(name);
		ctx.assert(course, 400, 'The course already exists!');
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
