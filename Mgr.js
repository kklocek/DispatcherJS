//mgr.js
function Manager(map) {

	this.map = map;
	this.waitForMap();
	this.accidentManager = new AccidentManager(map);

	this.units = [];
	this.startTime = new Date().getTime() / 1000; //sekundy
	this.timer = 0;
	//TODO: Poki co
	this.delta = 5; //sekund
	//this.numberofunits = 9;
	var unit1 = new Unit("JRG 1", 80, 50.060169, 19.9426962, this.map, [], []);
	c = new Car(eventType.FIRE, carWeights.MEDIUM, unit1)
	unit1.cars = [c];
	this.units.push(unit1);
	this.units.push(new Unit("JRG 5", 70, 50.0916211, 19.9198408, this.map,[], []));
	this.units.push(new Unit("JRG 3", 60, 50.0755796, 19.8873124, this.map,[], []));
	this.units.push(new Unit("JRG 7", 80, 50.0940787, 19.977011, this.map,[], []));
	this.units.push(new Unit("JRG 6", 90, 50.0159093, 20.0155131, this.map,[], []));

	for(var i = 0; i < this.units.length; i++) {
		this.units[i].plot();
	}
	this.endGame = false;
	this.phone = new Phone();
	this.level = 0;

	
	this.work();
}

Manager.prototype.work = function() {
	
	if(!this.endgame && this.map != null) {
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

Manager.prototype.waitForMap = function() {
	if(this.map == null) {
		requestAnimationFrame(this.waitForMap.bind(this))
	}
}