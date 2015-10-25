function Phone() {
	this.accident = null;
	this.accidents = [];
	this.phoneButton = document.getElementById("phoneButton");
	this.image = document.createElement("img");
	this.image.src = 'assets/gfx/phoneButtonIdle.png';
	this.phoneButton.appendChild(this.image);
	var self = this;
	this.phoneButton.onclick = function() {
		self.checkState();//.bind(this);
	};

	this.isRinging = false;
};

Phone.prototype.addAccident = function(accident) {
	//this.accident = accident;
	this.accidents.push(accident);
}

Phone.prototype.ring = function() {
	console.log("RINGING");
	//this.phoneButton.textContent = "RING";
	this.image.src = 'assets/gfx/phoneButtonWaiting.png';
	this.isRinging = true;
}

Phone.prototype.checkState = function() {
	if(this.isRinging && CURRENT_ACCIDENT == null) {
		//TODO: Ograniczenie ze za duzo naraz
		//this.accidents.shift();
		var accident = this.accidents.shift();
		accidentDialog.show(accident);
		accident.state = accidentState.WAITING_FOR_ACTION;
		accident.plot();
		//this.accident = null;
		if(this.accidents.length == 0) {
			this.isRinging = false;
			//this.phoneButton.textContent = "PHONE";
			this.image.src = 'assets/gfx/phoneButtonIdle.png';
		}
	}
 }
