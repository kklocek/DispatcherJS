//samochod
//	posiada rodzaj:
//		techniczny/beczkowoz/medyczny
function Car(type, destiny) {
	this.type = type;
	//destiny - rodzaj przeznaczenia
	//inaczej - techniczny/beczkowoz/medyczny
	this.destiny = destiny;
	this.life = 100; //stopien zuzycia inaczej
	this.accident = null; //auto jest przypisane do danej akcji, null jesli jest wolne
}

Car.prototype.getSpeedRate = function() {
	return this.type / 3; //TODO: Define states
}