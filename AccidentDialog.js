function AccidentDialog(){
	this.element = document.getElementById('accidentDialog');
	this.textContainer = document.createElement('div');
	this.whatRow = document.createElement('div');
	this.whereRow = document.createElement('div');
	this.infoRow = document.createElement('div');

	this.textContainer.appendChild(this.infoRow);
	this.textContainer.appendChild(this.whereRow);
	this.textContainer.appendChild(this.whatRow);
	this.element.appendChild(this.textContainer);
}

AccidentDialog.prototype.show = function(accident){
	this.element.style.display = "block";
	//Renderowanie elementow
	this.whatRow.textContent = "WHAT: " + accident.type;
	this.whereRow.textContent = "WHERE: " + accident.x + " " + accident.y;
	//infoRow...
}

