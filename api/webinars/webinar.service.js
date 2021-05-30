'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_webinar');
// Local
const generateId = require('../../utils/generateId.util');
const Webinar = require('../../src/Webinar');
// Variables
const db = {
	webinars: [
		{
			id: 'bff28903-042e-47c2-b9ee-07c3954989ec',
			name: 'Srikanth',
			ctdAt: 1558536830937,
		},
		{
			id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
			name: 'Chikku',
			ctdAt: 1558536843742,
		},
		{
			id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
			name: 'King',
			ctdAt: 1558536863550,
		},
	],
};

const service = {};

service.findById = async (webinarId) => {
	let webinar;
	try {
		webinar = db.webinars.find(webinar => webinar.id === webinarId) || {};
		// webinar = new Webinar(webinar);
	} catch (err) {
		log.error(err);
	}
	return webinar;
};

service.findByName = async (webinarName) => {
	let webinar;
	try {
		webinar = db.webinars.find(webinar => webinar.name === webinarName) || {};
		// webinar = new Webinar(webinar);
	} catch (err) {
		log.error(err);
	}
	return webinar;
};

service.getAll = async () => {
	let webinars;
	try {
		webinars = db.webinars || [];
		log.log('webinars > %o ', webinars);
		// webinars = webinars.map((webinar) => new Webinar(webinar));
	} catch (err) {
		log.error(err);
	}
	return webinars;
};

service.create = async (webinar) => {
	webinar = webinar || {};
	let createdWebinar;
	try {
		const {name} = webinar;
		const id = generateId();
		const newUser = {
			id,
			name,
			ctdAt: Date.now(),
		};
		db.webinars.push(newUser);
		createdWebinar = service.findById(id) || {};
	} catch (err) {
		log.error(err);
	}
	return createdWebinar;
};

module.exports = service;
