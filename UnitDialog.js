function UnitDialog(){
	this.element = document.getElementById('unitDialog');
	this.textContainer = document.createElement('div');
	this.energyBar = document.createElement('div');
	this.organizationBar = document.createElement('div');
	this.skills = document.createElement('div');
	this.cars = document.createElement('div');
	this.button = document.getElementById('unitDialogButton');
	this.phoneButton = document.getElementById("phoneButton");
	this.outgoing = [];
	var self = this;
	this.button.onclick = function() {
		self.closeDialog();
	}

	this.textContainer.appendChild(this.energyBar);
	this.textContainer.appendChild(this.organizationBar);
	this.textContainer.appendChild(this.skills);
	this.textContainer.appendChild(this.cars);
	this.element.appendChild(this.textContainer); 

	
}

UnitDialog.prototype.show = function(unit){
	this.phoneButton.style.display = "none";
	var self = this;
	this.element.style.display = "block";
	//Renderowanie elementow
	this.energyBar.textContent = "ENERGY: " + unit.energy;
	this.organizationBar.textContent = "ORGANIZATION: " + unit.organization;
	for(var i=0; i<unit.skills.length; i++){
			var x = document.createElement('img');
			x.src = unit.skills[i].imagePath;
			//this.skills.textContent = "SKILLS: " + 
			this.skills.appendChild(x);

	}
	for(var j=0; j<unit.cars.length; j++){
		(function(j){
			var e = document.createElement('div');
			e.onclick = function() {
				//self.unit.cars[j].state = accidentState.GOING;
				self.outgoing.push(unit.cars[j]);
			}
			var y = document.createElement('img');
			y.src = unit.cars[j].imagePath;
			e.appendChild(y);
			self.cars.appendChild(e);
		})(j);
			

	}

/*
	this.textContainer.appendChild(this.energyBar);
	this.textContainer.appendChild(this.organizationBar);
	this.textContainer.appendChild(this.skills);
	this.textContainer.appendChild(this.cars);
	this.element.appendChild(this.textContainer); */
}

UnitDialog.prototype.closeDialog = function() {
	this.phoneButton.style.display = "inline";
	this.element.style.display = "none";
	for(var i = 0; i < this.outgoing.length; i++) {
		this.outgoing[i].state = accidentState.GOING;
		//Jeszcze destynacja
	}
	this.outgoing = [];
	CURRENT_ACCIDENT = null;
	//this.element.removeChild()
}