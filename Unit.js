//Unit.js
function Unit(name, organization, x, y, skills = [], cars = []) {
	this.name = name;
	this.organization = organization;
	this.energy = 100;
	this.skills = skills;
	this.cars = cars;
	this.x = x;
	this.y = y;
	this.timer = 0;
}

Unit.prototype.update = function(dt) {
	this.timer += dt;
	if(this.energy < 100 && this.timer > TIME_TO_RECOVER_ENERGY_RATE) {
		this.timer = 0;
		this.energy += TIME_TO_RECOVER_ENERGY_RATE;
		if(this.energy > 100)
			this.energy = 100;
	}
};