'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_lesson');
// Local
const generateId = require('../../utils/generateId.util');
const Lesson = require('../../src/Lesson');
// Variables
const db = {
	lessons: [
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

service.findById = async (lessonId) => {
	let lesson;
	try {
		lesson = db.lessons.find(lesson => lesson.id === lessonId) || {};
		// lesson = new Lesson(lesson);
	} catch (err) {
		log.error(err);
	}
	return lesson;
};

service.findByName = async (lessonName) => {
	let lesson;
	try {
		lesson = db.lessons.find(lesson => lesson.name === lessonName) || {};
		// lesson = new Lesson(lesson);
	} catch (err) {
		log.error(err);
	}
	return lesson;
};

service.getAll = async () => {
	let lessons;
	try {
		lessons = db.lessons || [];
		log.log('lessons > %o ', lessons);
		// lessons = lessons.map((lesson) => new Lesson(lesson));
	} catch (err) {
		log.error(err);
	}
	return lessons;
};

service.create = async (lesson) => {
	lesson = lesson || {};
	let createdLesson;
	try {
		const {name} = lesson;
		const id = generateId();
		const newUser = {
			id,
			name,
			ctdAt: Date.now(),
		};
		db.lessons.push(newUser);
		createdLesson = service.findById(id) || {};
	} catch (err) {
		log.error(err);
	}
	return createdLesson;
};

module.exports = service;
