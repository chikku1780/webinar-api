'use strict';
// Global
const log = require('debug-level').log('webinar-api:api_tag');
// Local
const generateId = require('../../utils/generateId.util');
const Tag = require('../../src/Tag');
// Variables
const db = {
	tags: [
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

service.findById = async (tagId) => {
	let tag;
	try {
		tag = db.tags.find(tag => tag.id === tagId) || {};
		// tag = new Tag(tag);
	} catch (err) {
		log.error(err);
	}
	return tag;
};

service.findByName = async (tagName) => {
	let tag;
	try {
		tag = db.tags.find(tag => tag.name === tagName) || {};
		// tag = new Tag(tag);
	} catch (err) {
		log.error(err);
	}
	return tag;
};

service.getAll = async () => {
	let tags;
	try {
		tags = db.tags || [];
		log.log('tags > %o ', tags);
		// tags = tags.map((tag) => new Tag(tag));
	} catch (err) {
		log.error(err);
	}
	return tags;
};

service.create = async (tag) => {
	tag = tag || {};
	let createdTag;
	try {
		const {name} = tag;
		const id = generateId();
		const newUser = {
			id,
			name,
			ctdAt: Date.now(),
		};
		db.tags.push(newUser);
		createdTag = service.findById(id) || {};
	} catch (err) {
		log.error(err);
	}
	return createdTag;
};

module.exports = service;
