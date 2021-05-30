'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_student');
// Local
const generateId = require('../../utils/generateId.util');
const Student = require('../../src/Student');
// Variables
const db = {
	students: [
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

service.findById = async (studentId) => {
	let student;
	try {
		student = db.students.find(student => student.id === studentId) || {};
		// student = new Student(student);
	} catch (err) {
		log.error(err);
	}
	return student;
};

service.findByName = async (studentName) => {
	let student;
	try {
		student = db.students.find(student => student.name === studentName) || {};
		// student = new Student(student);
	} catch (err) {
		log.error(err);
	}
	return student;
};

service.getAll = async () => {
	let students;
	try {
		students = db.students || [];
		log.log('students > %o ', students);
		// students = students.map((student) => new Student(student));
	} catch (err) {
		log.error(err);
	}
	return students;
};

service.create = async (student) => {
	student = student || {};
	let createdStudent;
	try {
		const {name} = student;
		const id = generateId();
		const newUser = {
			id,
			name,
			ctdAt: Date.now(),
		};
		db.students.push(newUser);
		createdStudent = service.findById(id) || {};
	} catch (err) {
		log.error(err);
	}
	return createdStudent;
};

module.exports = service;
