'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_webinar');
// Local
const service = require('./webinar.service');
// Variables

const controller = {};

controller.getOneById = async ctx => {
	try {
		const {webinarId} = ctx.params;
		const webinar = await service.findById(webinarId);
		ctx.assert(webinar, 404, "The requested webinar doesn't exist");
		ctx.status = 200;
		ctx.body = webinar;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getOneByName = async ctx => {
	try {
		const {webinarName} = ctx.params;
		const webinar = await service.findByName(webinarName);
		ctx.assert(webinar, 404, "The requested webinar doesn't exist");
		ctx.status = 200;
		ctx.body = webinar;
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
		ctx.assert(name, 400, 'The webinar info is malformed!');
		const webinar = await service.findByName(name);
		ctx.assert(webinar, 400, 'The webinar already exists!');
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
