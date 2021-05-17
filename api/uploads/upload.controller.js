'use strict';

// Global
const fs = require('fs');
const os = require('os');
const path = require('path');
const log = require('debug-level').log('webinar-api:api_upload');
// Local
// Variables

const controller = {};

controller.uploadFile = async (ctx, next) => {
	// ignore non-POSTs
	if ('POST' !== ctx.method) return await next();
	
	const file = ctx.request.files.file;
	const reader = fs.createReadStream(file.path);
	const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
	reader.pipe(stream);
	console.log('uploading %s -> %s', file.name, stream.path);
	
	ctx.redirect('/');
};

module.exports = controller;
