//mgr.js
function Manager() {
	this.units = [];
	this.startTime = new Date().getTime() / 1000; //sekundy
	this.timer = 0;
	//TODO: Poki co
	this.delta = 5; //sekund
	//this.numberofunits = 9;
	this.units.push(new Unit("AGHacks", 0, 0, 12));
	this.units.push(new Unit("Krakow", 1, 1, 19));
	this.accidentManager = new AccidentManager();
	this.endGame = false;
	this.phone = new Phone();
	this.level = 0;
	this.map = null;
	this.work();
}

Manager.prototype.work = function() {
	
	if(!this.endgame) {
//Animacje itd...
		this.accidentManager.update();
		

		var dt = (new Date().getTime() / 1000) - this.startTime; 
		this.timer += dt;
		for(var i = 0; i < this.units.length; i++) 
			this.units[i].update(dt);

		if(this.timer > this.delta) {
			if (this.accidentManager.isReadyForNextAccident(this.level)) {
				var accident = this.accidentManager.makeAccident();
				this.phone.addAccident(accident);
				this.phone.ring();
			}
			this.timer = 0;
			this.startTime = new Date().getTime() / 1000;
		}

	}
	//var self = this;
	requestAnimationFrame(this.work.bind(this));
};