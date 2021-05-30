const mongoose = require('mongoose');

function loadSchema({Schema}) {
	Schema = Schema || mongoose.Schema;
	const InstructorSchema = new Schema(
		{
			id: {type: String},
			username: {type: String},
			password: {type: String},
			email: {type: String},
			name: {type: String},
			ctdAt: {type: Date, default: Date.now},
		},
		{collection: 'instructors'},
	);
	return InstructorSchema;
	// return mongoose.model('Instructor', InstructorSchema)
}

module.exports = loadSchema;
