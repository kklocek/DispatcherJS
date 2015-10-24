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

	this.textContainer.appendChild(this.infoRow);
	this.textContainer.appendChild(this.whereRow);
	this.textContainer.appendChild(this.whatRow);
	this.element.appendChild(this.textContainer);
}

AccidentDialog.prototype.show = function(accident){
	this.phoneButton.style.display = "none";
	this.element.style.display = "block";
	//Renderowanie elementow
	this.whatRow.textContent = "WHAT: " + accident.type;
	this.whereRow.textContent = "WHERE: " + accident.x + " " + accident.y;
	//infoRow...
}

AccidentDialog.prototype.closeDialog = function() {
	this.element.style.display = "none";
	this.phoneButton.style.display = "inline";
}


