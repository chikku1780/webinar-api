'use strict';

// Global
const log = require('debug-level').log('webinar-api:api_tag');
// Local
const service = require('./tag.service');
// Variables

const controller = {};

controller.getOneById = async ctx => {
	try {
		const {tagId} = ctx.params;
		const tag = await service.findById(tagId);
		ctx.assert(tag, 404, "The requested tag doesn't exist");
		ctx.status = 200;
		ctx.body = tag;
	} catch (err) {
		return controller.errorHandler(ctx, err);
	}
};

controller.getOneByName = async ctx => {
	try {
		const {tagName} = ctx.params;
		const tag = await service.findByName(tagName);
		ctx.assert(tag, 404, "The requested tag doesn't exist");
		ctx.status = 200;
		ctx.body = tag;
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
		ctx.assert(name, 400, 'The tag info is malformed!');
		const tag = await service.findByName(name);
		ctx.assert(tag, 400, 'The tag already exists!');
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
