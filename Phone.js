function Phone() {
	this.accident = null;
	this.phoneButton = document.getElementById("phoneButton");
	var self = this;	
	this.phoneButton.onclick = function() {
		self.checkState();
	};

	this.isRinging = false;
	//TODO: onClick!
};

Phone.prototype.setAccident = function(accident) {
	this.accident = accident;
}

Phone.prototype.ring = function() {
	this.phoneButton.text = "RING";
	this.isRinging = true;
}

Phone.prototype.checkState = function() {
	if(this.isRinging) {
		//TODO: Ograniczenie ze za duzo naraz
		
		this.accident = null;
		this.isRinging = false;
	}
 }
