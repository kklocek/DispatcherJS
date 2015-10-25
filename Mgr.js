//mgr.js
function Manager(map) {

	this.map = map;
	this.waitForMap();
	this.accidentManager = new AccidentManager(map, this);

	this.units = [];
	this.startTime = new Date().getTime() / 1000; //sekundy
	this.timer = 0;
	//TODO: Poki co
	this.delta = 5; //sekund
	//this.numberofunits = 9;
	var unit1 = new Unit("JRG 1", 80, 50.060169, 19.9426962, this.map, [], []);
	c = new Car(eventType.CAR_ACCIDENT, carWeights.MEDIUM, unit1);
	c1 = new Car(eventType.CAT_DISASTER, carWeights.LIGHT, unit1);
	c2 = new Car(eventType.FIRE, carWeights.HEAVY, unit1);
	unit1.cars = [c, c1, c2];
	this.units.push(unit1);
	/*
	this.units.push(new Unit("JRG 5", 70, 50.0916211, 19.9198408, this.map,[], []));
	this.units.push(new Unit("JRG 3", 60, 50.0755796, 19.8873124, this.map,[], []));
	this.units.push(new Unit("JRG 7", 80, 50.0940787, 19.977011, this.map,[], []));
	this.units.push(new Unit("JRG 6", 90, 50.0159093, 20.0155131, this.map,[], []));
	*/
	for(var i = 0; i < this.units.length; i++) {
		this.units[i].plot();
	}
	this.endGame = false;
	this.phone = new Phone();
	this.level = 0;
	this.pointsElem = document.getElementById('points');
	this.countdownElem = document.getElementById('countdown');

	
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


		this.pointsElem.textContent = "Points: " + Number.parseInt(points);
	}
	//var self = this;
	if(!this.endgame)
		requestAnimationFrame(this.work.bind(this));

	//Konczymy gre
	if(this.endgame) {
		var endElement = document.getElementById('endGame');
		var ui = document.getElementById('ui');
		ui.style.display = "none";
		endElement.style.display = "inline";
		endElement.firstChild.textContent = "We are sorry, but you were too late. Now you could see how firefighters needs to be to handle all accidents. You earned " + Number.parseInt(points) + ".";

	}
};

Manager.prototype.waitForMap = function() {
	if(this.map == null) {
		requestAnimationFrame(this.waitForMap.bind(this));
	}
};

Manager.prototype.endAllGame = function() {
	this.endgame = true;
};