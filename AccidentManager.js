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
	var accident = new Accident(0,0,0,"", 1);
	this.accidents.push(accident);
	return accident;
};

AccidentManager.prototype.isReadyForNextAccident = function(level) {
	//TODO: Generowanie losowo prawdopodobienstwa incydentu
var r = Math.floor(Math.random()*this.n);
if(r == 5)
	return true;
else return false;
};
}
