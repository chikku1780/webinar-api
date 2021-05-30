'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_instructor');
// Local
const generateId = require('../../utils/generateId.util');
const Instructor = require('../../src/Instructor');
// Variables
// let InstructorModel;

const service = {};

class InstructorService {
	constructor(model) {
		this.model = model;
	}

	getModel() {
		return this.model;
	}

	setModel(model) {
		this.model = model;
	}

	async createInstructor(instructor) {
		instructor = instructor || {};
		let self = this;
		let InstructorModel = self.getModel();
		let createdInstructor;
		try {
			const {name} = instructor;
			const id = generateId();
			const _instructor = Object.assign({}, instructor);
			createdInstructor = await InstructorModel.create(_instructor);
		} catch (err) {
			log.error(err);
		}
		return createdInstructor;
	};

	async getInstructorById(instructorId) {
		let self = this;
		let InstructorModel = self.getModel();
		let instructor;
		try {
			let find = {id: instructorId};
			instructor = await InstructorModel.findOne(find) || {};
		} catch (err) {
			log.error(err);
		}
		return instructor;
	};

	async getInstructorByUsername(instructorUsername) {
		let self = this;
		let InstructorModel = self.getModel();
		let instructor;
		try {
			let find = {username: instructorUsername};
			log.log('find > %o', find);
			instructor = await InstructorModel.findOne(find) || {};
		} catch (err) {
			log.error(err);
		}
		return instructor;
	};

	async getInstructorByName(instructorName) {
		let self = this;
		let InstructorModel = self.getModel();
		let instructor;
		try {
			let find = {name: instructorName};
			instructor = await InstructorModel.findOne(find) || {};
		} catch (err) {
			log.error(err);
		}
		return instructor;
	};

	async getInstructors() {
		let self = this;
		let InstructorModel = self.getModel();
		let instructors;
		try {
			let find = {};
			instructors = await InstructorModel.find(find) || [];
			log.log('instructors > %o ', instructors);
		} catch (err) {
			log.error(err);
		}
		return instructors;
	};

}

module.exports = InstructorService;
