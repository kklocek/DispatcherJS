function UnitDialog(){
	this.name = document.getElementById('UnitDialog');
	this.textContainer = document.createElement('div');
	this.energyBar = document.createElement('div');
	this.organizationBar = document.createElement('div');
	this.skills = document.createElement('div');;
	this.cars = document.createElement('div');;

	this.textContainer.appendChild(this.energyBar);
	this.textContainer.appendChild(this.organizationBar);
	this.textContainer.appendChild(this.skills);
	this.textContainer.appendChild(this.cars);
	this.name.appendChild(this.textContainer);
}

UnitDialog.prototype.show = function(unit){
	this.name.style.display = "block";
	//Renderowanie elementow
	this.energyBar.textContent = "ENERGY: " + unit.type;
	this.organizationBar.textContent = "ORGANIZATION: " + unit.organization;
	for(var i=0; i<unit.skills.length; i++){
			var x = document.createElement('img');
			x.href = unit.skills[i].imagePath;
			//this.skills.textContent = "SKILLS: " + 
			this.skills.appendChild(x);

	}
	for(var j=0; i<unit.cars.length; i++){
			var y = document.createElement('img');
			y.href = unit.cars[i].imagePath;
			this.cars.appendChild(y);

	}