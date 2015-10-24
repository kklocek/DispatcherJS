function AccidentManager(map) {
	this.map = map;
	this.accidents = [];
	this.numbers =[]
	this.n = 5;
	for (var i=0; i<this.n; i++){
		this.numbers [i] = i+1;
	}
}

AccidentManager.prototype.makeAccident = function() {
	var lngMin = 1981916428;
  	var lngMax = 2010789900;
  	var latMax = 5009242859;
  	var latMin = 5001369614;
  	var randomLat = (Math.floor(Math.random() * (latMax - latMin + 1)) + latMin)/100000000;
  	var randomLng = (Math.floor(Math.random() * (lngMax - lngMin + 1)) + lngMin)/100000000;
	var accident = new Accident(0, randomLat, randomLng,"", 0, map);
	this.accidents.push(accident);
	CURRENT_ACCIDENT = accident;
	return accident;
};

AccidentManager.prototype.isReadyForNextAccident = function(level) {
	//TODO: Generowanie losowo prawdopodobienstwa incydentu
	var r = Math.floor(Math.random()*this.n);
	if(r == 5 || r == 4)
		return true;
	else 
		return false;
};

AccidentManager.prototype.update = function() {
	for(var i = 0; i < this.accidents.length; i++) {
		this.accidents[i].update();		
	}

	for(var i = 0; i < this.accidents.length; i++) {
		if(this.accidents[i].progress == 100) {
			for (var j = 0; j < this.accidents[i].cars.length; j++) {
				this.accidents[i].cars[j].state = actionState.COULD_RETURN; 
			}
			this.accidents[i].state = accidentState.WAITING_FOR_REPORT;
			//this.accidents[i].cars = null;
			//this.accidents.splice(i, 1);			
		}
		else if(this.accidents[i].state == accidentState.ENDED) {
			for (var j = 0; j < this.accidents[i].cars.length; j++) {
				this.accidents[i].cars[j].state = actionState.GOING; 
			}
			this.accidents[i].marker.setMap(null); //usuwanie markera
			this.accidents[i].cars = null;
			this.accidents.splice(i, 1);	
		}
	}

}

