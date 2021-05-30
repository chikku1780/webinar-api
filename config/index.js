'use strict';
// Global
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const log = require('debug-level').log('webinar-api:config');
// Local

// Variables
let config = {};
const basePath = path.join(__dirname, 'components');

// Require all the files from the components folder and add the imported to a unique configuration object
fs.readdirSync(basePath).forEach(file => {
	let fileName = file.split('.')[0];
	let _config = {};
	const componentConfig = require(path.join(basePath, file));
	_config[fileName] = componentConfig;
	config = Object.assign(config, _config);
});

module.exports = config;
