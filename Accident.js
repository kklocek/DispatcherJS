//rodzaj zdarzenia
function Accident(type, x, y, info, state, map, timeLimit) {
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
	this.timeLimit = timeLimit;
	this.timer = 0;
	this.startTime = new Date().getTime() / 1000;
	this.firstTime = true;
	this.ended = false;
	this.countdown = document.getElementById('countdown');
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

	/*
	if(this == CURRENT_ACCIDENT) {
		if(this.firstTime) {
			this.firstTime = false;
			this.starTime = new Date().getTime() / 1000;
		}

		this.timer = new Date().getTime() / 1000 - this.startTime;
		this.countdown.textContent = "TIME TO HANDLE: " + Number.parseInt(this.timer) + "/" + this.timeLimit;
		if(this.timer >= this.timeLimit) {
			this.ended = true;
			this.countdown.textContent = 'XXX';
		}
	}
	*/
	if(CURRENT_ACCIDENT != null) {
	if(CURRENT_ACCIDENT.firstTime) {
		CURRENT_ACCIDENT.firstTime = false;
		CURRENT_ACCIDENT.starTime = new Date().getTime() / 1000;
		}

		CURRENT_ACCIDENT.timer = new Date().getTime() / 1000 - CURRENT_ACCIDENT.startTime;
		CURRENT_ACCIDENT.countdown.textContent = "TIME TO HANDLE: " + Number.parseInt(CURRENT_ACCIDENT.timer) + "/" + CURRENT_ACCIDENT.timeLimit;
		if(CURRENT_ACCIDENT.timer >= CURRENT_ACCIDENT.timeLimit) {
			CURRENT_ACCIDENT.ended = true;
			CURRENT_ACCIDENT.countdown.textContent = 'XXX';
		}
	}

	if(this.cars.length > 0 && this.state == accidentState.WAITING_FOR_ACTION)
		this.state = accidentState.DOING;
	var self = this;
	if(this.state == accidentState.DOING) {
		var cars = this.cars.filter(function(el){
			return el.type == self.type;
		});
		
		this.progress += cars.length * PROGRESS_RATE;
	}

}

Accident.prototype.hasGameEnded = function() {
	return this.ended;
}