'use strict';
// Global
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const log = require('debug-level').log('webinar-api:schemas');
// Local

// Variables

const basePath = path.join(__dirname, './models');

function loadSchemas() {
	let schemas = {};
	try {
		let files = fs.readdirSync(basePath) || [];
		// log.log('files > %o', files);
		files.forEach((file)=> {
			let fileName = file.split('.')[0];
			const modelSchema = require(path.join(basePath, file));
			schemas[fileName] = modelSchema;
			// log.log('schema loaded %o ', fileName);
		});
	} catch (e) {
		log.error(e);
	}
	return schemas;
}

module.exports = loadSchemas;
