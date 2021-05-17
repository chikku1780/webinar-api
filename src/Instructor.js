class Instructor {
	constructor({id, name, ctdAt}) {
		this.id = id;
		this.name = name;
		this.ctdAt = ctdAt;
		this.webinars = [];
		this.lessons = [];
	}
}

module.exports = Instructor;
