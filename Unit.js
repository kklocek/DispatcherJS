//Unit.js
function Unit(name, organization, x, y, map, skills = [], cars = []) {
	this.name = name;
	this.map = map;
	this.organization = organization;
	this.energy = 100;
	this.skills = skills;
	this.cars = cars;
	this.x = x;
	this.y = y;
	this.timer = 0;
	this.marker = null
}

Unit.prototype.update = function(dt) {
	this.timer += dt;
	if(this.energy < 100 && this.timer > TIME_TO_RECOVER_ENERGY_RATE) {
		this.timer = 0;
		this.energy += TIME_TO_RECOVER_ENERGY_RATE;
		if(this.energy > 100)
			this.energy = 100;
	}

	for(var i = 0; i < this.cars.length; i++) {
		this.cars[i].update();
	}
};

Unit.prototype.plot = function() {
	var self = this;
	this.marker = new google.maps.Marker({
	    position: {lat: self.x, lng: self.y},
	    map: self.map,
	    title: self.name,
	    icon: "assets\\gfx\\marker.png"
  });

	google.maps.event.addDomListener(this.marker, 'click', function() {
		unitDialog.show(self)
  });

}