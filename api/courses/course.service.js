'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_course');
// Local
const generateId = require('../../utils/generateId.util');
const Course = require('../../src/Course');
// Variables
const db = {
	courses: [
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

service.findById = async (courseId) => {
	let course;
	try {
		course = db.courses.find(course => course.id === courseId) || {};
		// course = new Course(course);
	} catch (err) {
		log.error(err);
	}
	return course;
};

service.findByName = async (courseName) => {
	let course;
	try {
		course = db.courses.find(course => course.name === courseName) || {};
		// course = new Course(course);
	} catch (err) {
		log.error(err);
	}
	return course;
};

service.getAll = async () => {
	let courses;
	try {
		courses = db.courses || [];
		log.log('courses > %o ', courses);
		// courses = courses.map((course) => new Course(course));
	} catch (err) {
		log.error(err);
	}
	return courses;
};

service.create = async (course) => {
	course = course || {};
	let createdCourse;
	try {
		const {name} = course;
		const id = generateId();
		const newUser = {
			id,
			name,
			ctdAt: Date.now(),
		};
		db.courses.push(newUser);
		createdCourse = service.findById(id) || {};
	} catch (err) {
		log.error(err);
	}
	return createdCourse;
};

module.exports = service;
