//rodzaj zdarzenia
function Accident(type, x, y, info, state) {
	this.type = type; //TODO: Zrobic to
	this.x = x;
	this.y = y;
	//TODO: Info, do it
	this.info = info;
	this.state = state; //TODO: enuma zrobic, albo inny obiekt na takie rzeczy
	this.progress = 0;
	this.cars = [];
}

Accident.prototype.plot = function() {
	//TODO: Wyrysuj to na mapie
}

Accident.prototype.addCars = function(car) {
	this.cars.push(car);
}

Accident.prototype.update = function() {
	
}