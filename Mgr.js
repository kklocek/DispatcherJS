//mgr.js
function Manager() {
	this.units = [];
	//this.numberofunits = 9;
	this.units.push(new Unit("AGHacks", 12));
	this.units.push(new Unit("Krakow", 19));
	this.accidentManager = new AccidentManager();
	this.endGame = false;
	this.phone = new Phone();
	this.level = 0;
	this.work();
}

Manager.prototype.work = function() {
	
	while(!this.endgame) {
//Animacje itd...
		if (this.accidentManager.isReadyForNextAccident(this.level)) {
			var accident = this.accidentManager.makeAccident();
			this.phone.setAccident(accident);
			this.phone.ring();
		}

	}
};