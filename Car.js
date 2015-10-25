//samochod
//	posiada rodzaj:
//		techniczny/beczkowoz/medyczny
function Car(type, weight, unit) {
	this.type = type;
	//destiny - rodzaj przeznaczenia
	//inaczej - techniczny/beczkowoz/medyczny
	this.weight = weight;
	this.life = 100; //stopien zuzycia inaczej
	this.accident = null; //auto jest przypisane do danej akcji, null jesli jest wolne
	this.unit = unit; //Referencja na jednostke
	this.state = actionState.AVAILABLE;
	this.x = unit.x;
	this.y = unit.y;
	//!
	this.imagePath = 'assets\\gfx\\markersil.png'
	this.marker = null;
	this.destination = [];
	this.destinationIndex = 0;
	this.dt = 9.0 / 60.0;
	this.timer = 0;
	this.startTime = (new Date().getTime() )/ 1000.0;
	this.firstTime = true;
	this.isComingBack = false;
}

Car.prototype.getSpeedRate = function() {
	return this.weight; //TODO: Define states
}

Car.prototype.sendCar = function(accident) {
	this.accident = accident;
}

Car.prototype.update = function() {

	if(this.state == actionState.WORKING) {
		if(this.accident.progress >= 100)
			this.goHome();
	}

	else if(this.state == actionState.GOING) {
		if(this.firstTime) {
			var delta = 0;
			this.firstTime = false;
			this.startTime = (new Date().getTime() )/ 1000.0;
		}
		else
			var delta = (new Date().getTime()  / 1000.0)- this.startTime;

		this.timer += delta;
		if(this.timer >= this.dt) {
			this.destinationIndex += Number.parseInt(this.timer / this.dt);
			if(this.destinationIndex >= this.destination.length - 1) {
				this.destinationIndex = this.destination.length - 1;
				this.marker.setMap(null);
				this.marker = null;
				if(this.isComingBack) {
					this.isComingBack = false;
					this.state = actionState.AVAILABLE;	
					this.destinationIndex = 0;
					this.destination = null;
					return;

				} else {
					this.state = actionState.WORKING;
					this.accident.cars.push(this);
					return;
				}
			}
			this.plot();
			
		}

	}
}

Car.prototype.plot = function() {
	if(this.destination.length == 0)
		return;

	var map = this.unit.map;

	var self = this;
	if(this.marker == null) {
		this.marker = new google.maps.Marker({
		    position: this.destination[0],
		    map: map,
		    title: "Car",
		    icon: "assets\\gfx\\markersil.png"
	  });
	}
	else {
		var pos = new google.maps.LatLng(this.destination[this.destinationIndex].lat(), this.destination[this.destinationIndex].lng());
		//var pos = this.destination[this.destinationIndex];
		this.marker.setPosition(pos);
		//this.marker.setMap(null);
		//Albo nowy marker albo zmien pozycje
		/*
		this.marker.setMap(null);
		this.marker = new google.maps.Marker({
		    position: this.destination[this.destinationIndex],
		    map: map,
		    title: "LOL",
		    icon: "assets\\gfx\\marker.png"
	  });
*/
	}

}

Car.prototype.goHome = function() {
	this.destinationIndex = 0;
	this.destination.reverse();
	this.state = actionState.GOING; 
	this.accident = null;
	this.firstTime = true;
	this.isComingBack = true;
	this.timer = 0;
	this.startTime = new Date().getTime() / 1000.0;
}

				