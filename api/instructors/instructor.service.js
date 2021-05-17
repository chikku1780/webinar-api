'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_instructor');
// Local
const generateId = require('../../utils/generateId.util');
const Instructor = require('../../src/Instructor');
// Variables
const db = {
	instructors: [
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

service.findById = async (instructorId) => {
	let instructor;
	try {
		instructor = db.instructors.find(instructor => instructor.id === instructorId) || {};
		// instructor = new Instructor(instructor);
	} catch (err) {
		log.error('Error > %o ', err);
	}
	return instructor;
};

service.findByName = async (instructorName) => {
	let instructor;
	try {
		instructor = db.instructors.find(instructor => instructor.name === instructorName) || {};
		// instructor = new Instructor(instructor);
	} catch (err) {
		log.error('Error > %o ', err);
	}
	return instructor;
};

service.getAll = async () => {
	let instructors;
	try {
		instructors = db.instructors || [];
		log.log('instructors > %o ', instructors);
		// instructors = instructors.map((instructor) => new Instructor(instructor));
	} catch (err) {
		log.error('Error > %o ', err);
	}
	return instructors;
};

service.create = async (instructor) => {
	instructor = instructor || {};
	let createdInstructor;
	try {
		const {name} = instructor;
		const id = generateId();
		const newUser = {
			id,
			name,
			ctdAt: Date.now(),
		};
		db.instructors.push(newUser);
		createdInstructor = service.findById(id) || {};
	} catch (err) {
		log.error('Error > %o ', err);
	}
	return createdInstructor;
};

module.exports = service;
