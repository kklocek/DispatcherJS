//rodzaj zdarzenia
function Accident(type, x, y, info, state, map) {
	this.type = type; 
	this.x = x;
	this.y = y;
	this.map = map;
	//TODO: Info, do it
	this.info = info;
	this.state = state; 
	this.progress = 0;
	this.cars = [];
	this.marker = null;
}

Accident.prototype.plot = function() {
	var self = this;
	this.marker = new google.maps.Marker({
	    position: {lat: self.x, lng: self.y},
	    map: self.map,
	    title: accidentDialog.mapType(self.type)
  });
}

Accident.prototype.addCars = function(car) {
	this.cars.push(car);
}

Accident.prototype.update = function() {
	if(this.state == accidentState.DOING) {
		var cars = this.cars.filter(function(el)	 {
			return el.type == this.type.bind(this);

		});
		
		this.progress += cars.length * PROGRESS_RATE;
	}

}