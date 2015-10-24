function AccidentManager() {
	this.accidents = [];
}

AccidentManager.prototype.makeAccident = function() {
	//TODO losowosc
	var accident = new Accident(0,0,0,"", 1);
	this.accidents.push(accident);
	return accident;
};

AccidentManager.prototype.isReadyForNextAccident = function() {
	//TODO: Generowanie losowo prawdopodobienstwa incydentu
	return true;
};

