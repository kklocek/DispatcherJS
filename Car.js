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
}

Car.prototype.getSpeedRate = function() {
	return this.weight; //TODO: Define states
}

Car.prototype.sendCar = function(accident) {
	this.accident = accident;
}

Car.prototype.update = function() {
	if(this.state == actionState.GOING) {
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
			if(this.destinationIndex > this.destination.length - 1) {
				this.destinationIndex = this.destination.length - 1;
				this.state = actionState.WORKING;
			}
			console.log(this.destinationIndex);
			console.log(this.destination.length);
			this.plot();
			this.timer = 0;
			this.startTime = new Date().getTime() / 1000.0;
		}

	}
}

Car.prototype.plot = function() {
	var map = this.unit.map;

	var self = this;
	if(this.marker == null) {
		this.marker = new google.maps.Marker({
		    position: this.destination[0],
		    map: map,
		    title: "LOL",
		    icon: "assets\\gfx\\markersil.png"
	  });
	}
	else {
		var pos = new google.maps.LatLng(this.destination[this.destinationIndex].lat(), this.destination[this.destinationIndex].lng());
		console.log("New position");
		console.log(pos.lat());
		console.log(pos.lng());
		console.log("destination");
		console.log(this.destination[this.destination.length - 1].lat());
		console.log(this.destination[this.destination.length - 1].lng());
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