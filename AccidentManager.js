function AccidentManager() {
	this.accidents = [];
	this.numbers =[]
	this.n = 5;
	for (var i=0; i<this.n; i++){
		this.numbers [i] = i+1;
	}
}

AccidentManager.prototype.makeAccident = function() {
	//TODO losowosc
	var accident = new Accident(0,0,0,"", 0);
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
		if(this.accidents[i].progress == 100) 
			this.accidents.splice(i, 1)			
	}

}

