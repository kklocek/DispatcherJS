function Phone() {
	this.accident = null;
	this.accidents = [];
	this.phoneButton = document.getElementById("phoneButton");
	var self = this;
	this.phoneButton.onclick = function() {
		self.checkState();//.bind(this);
	};

	this.isRinging = false;
	//TODO: onClick!
};

Phone.prototype.addAccident = function(accident) {
	//this.accident = accident;
	this.accidents.push(accident);
}

Phone.prototype.ring = function() {
	console.log("RINGING");
	this.phoneButton.textContent = "RING";
	this.isRinging = true;
}

Phone.prototype.checkState = function() {
	if(this.isRinging) {
		//TODO: Ograniczenie ze za duzo naraz
		//this.accidents.shift();
		var accident = this.accidents.shift();
		accidentDialog.show(accident);
		accident.state = accidentState.WAITING_FOR_ACTION;
		accident.plot();
		//this.accident = null;
		if(this.accidents.length == 0) {
			this.isRinging = false;
			this.phoneButton.textContent = "PHONE";
		}
	}
 }
