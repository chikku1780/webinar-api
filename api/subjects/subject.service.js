'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_subject');
// Local
const generateId = require('../../utils/generateId.util');
const Subject = require('../../src/Subject');
// Variables
const db = {
	subjects: [
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

service.findById = async (subjectId) => {
	let subject;
	try {
		subject = db.subjects.find(subject => subject.id === subjectId) || {};
		// subject = new Subject(subject);
	} catch (err) {
		log.error(err);
	}
	return subject;
};

service.findByName = async (subjectName) => {
	let subject;
	try {
		subject = db.subjects.find(subject => subject.name === subjectName) || {};
		// subject = new Subject(subject);
	} catch (err) {
		log.error(err);
	}
	return subject;
};

service.getAll = async () => {
	let subjects;
	try {
		subjects = db.subjects || [];
		log.log('subjects > %o ', subjects);
		// subjects = subjects.map((subject) => new Subject(subject));
	} catch (err) {
		log.error(err);
	}
	return subjects;
};

service.create = async (subject) => {
	subject = subject || {};
	let createdSubject;
	try {
		const {name} = subject;
		const id = generateId();
		const newUser = {
			id,
			name,
			ctdAt: Date.now(),
		};
		db.subjects.push(newUser);
		createdSubject = service.findById(id) || {};
	} catch (err) {
		log.error(err);
	}
	return createdSubject;
};

module.exports = service;
