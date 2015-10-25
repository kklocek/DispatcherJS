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
	
	var lngMin = 1991700000;
  	var lngMax = 2001610000;
  	var latMax = 5007600000;
  	var latMin = 5001400000;
  	var randomLat = (Math.floor(Math.random() * (latMax - latMin + 1)) + latMin)/100000000.0;
  	var randomLng = (Math.floor(Math.random() * (lngMax - lngMin + 1)) + lngMin)/100000000.0;

	var timeLimit = (Math.floor(Math.random() * (10 - 4 + 1)) + 4);

  	var accident = new Accident(0, randomLat, randomLng,"", 0, map, timeLimit);
	this.accidents.push(accident);
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
		if(this.accidents[i].progress >= 100) {
			//for (var j = 0; j < this.accidents[i].cars.length; j++) {
			//	this.accidents[i].cars[j].goHome();
			//}
			//Malo czasu...
			//this.accidents[i].state = accidentState.WAITING_FOR_REPORT;
			this.accidents[i].state = accidentState.ENDED;
			this.accidents[i].marker.setMap(null); //usuwanie markera
			this.accidents[i].cars = null;
			this.accidents.splice(i, 1);	


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


