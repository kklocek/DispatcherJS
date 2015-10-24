//samochod
//	posiada rodzaj:
//		techniczny/beczkowoz/medyczny
function Car(type, weight, x, y, unit) {
	this.type = type;
	//destiny - rodzaj przeznaczenia
	//inaczej - techniczny/beczkowoz/medyczny
	this.weight = weight;
	this.life = 100; //stopien zuzycia inaczej
	this.accident = null; //auto jest przypisane do danej akcji, null jesli jest wolne
	this.unit = unit; //Referencja na jednostke
	this.state = actionState.AVAILABLE;
	this.x = x;
	this.y = y;
}

Car.prototype.getSpeedRate = function() {
	return this.weight; //TODO: Define states
}

Car.prototype.sendCar = function(accident) {
	this.accident = accident;
}