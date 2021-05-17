'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_student');
// Local
const service = require('./student.service');
// Variables

const controller = {};

controller.getOneById = async ctx => {
	try {
		const {studentId} = ctx.params;
		const student = await service.findById(studentId);
		ctx.assert(student, 404, "The requested student doesn't exist");
		ctx.status = 200;
		ctx.body = student;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getOneByName = async ctx => {
	try {
		const {studentName} = ctx.params;
		const student = await service.findByName(studentName);
		ctx.assert(student, 404, "The requested student doesn't exist");
		ctx.status = 200;
		ctx.body = student;
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
		ctx.assert(name, 400, 'The student info is malformed!');
		const student = await service.findByName(name);
		ctx.assert(student, 400, 'The student already exists!');
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
