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
	this.imagePath = 'assets/gfx/marker.png'
}

Car.prototype.getSpeedRate = function() {
	return this.weight; //TODO: Define states
}

Car.prototype.sendCar = function(accident) {
	this.accident = accident;
}