function AccidentDialog(){
	this.element = document.getElementById('accidentDialog');
	this.textContainer = document.createElement('div');
	this.whatRow = document.createElement('div');
	this.whereRow = document.createElement('div');
	this.infoRow = document.createElement('div');
	this.phoneButton = document.getElementById("phoneButton");
	this.button = document.getElementById('accidentDialogButton');
	var self = this;
	this.button.onclick = function() {
		self.closeDialog();
	}

	this.types = ["Fire", "Car accident", "Natural disaster", "Medical disaster"];

	this.textContainer.appendChild(this.infoRow);
	this.textContainer.appendChild(this.whereRow);
	this.textContainer.appendChild(this.whatRow);
	this.element.appendChild(this.textContainer);
}

AccidentDialog.prototype.show = function(accident){
	accidentDialogDisplayed = true;
	this.phoneButton.style.display = "none";
	this.element.style.display = "block";
	//Renderowanie elementow
	this.whatRow.textContent = "WHAT: " + this.mapType(accident.type);
	this.whereRow.textContent = "WHERE: " + accident.x + " " + accident.y;
	CURRENT_ACCIDENT = accident;
	accident.state = accidentState.WAITING_FOR_ACTION;
	//infoRow...
}

AccidentDialog.prototype.closeDialog = function() {
	this.element.style.display = "none";
	accidentDialogDisplayed = false;
	if(CURRENT_ACCIDENT == null)
		this.phoneButton.style.display = "inline";
}

AccidentDialog.prototype.mapType = function(type) {
	return this.types[type];
}


