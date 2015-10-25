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
	/*
	if(this.element.style.display == "inline") {
		this.outgoing = [];
		this.closeDialog();
	}
	*/
	if(unitDialogDisplayed) {
		this.outgoing = [];
		this.unit = null;
		while(this.skills.firstChild)
			this.skills.removeChild(this.skills.firstChild);
		while(this.cars.firstChild)
			this.cars.removeChild(this.cars.firstChild);

	}

	this.unit = unit;
	//this.phoneButton.style.display = "none";
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
			//if(unit.cars[j].state == accidentState.GOING || unit.cars[j].state == accidentState.WORKING)
			//	return;
			if(self.unit.cars[j].state != accidentState.GOING && self.unit.cars[j].state != accidentState.WORKING) {
				var e = document.createElement('div');
				e.onclick = function() {
					//self.unit.cars[j].state = accidentState.GOING;
					self.outgoing.push(unit.cars[j]);
				}
				var y = document.createElement('img');
				y.src = unit.cars[j].imagePath;
				e.appendChild(y);
				self.cars.appendChild(e);
			}
		})(j);
			

	}
}

UnitDialog.prototype.closeDialog = function() {

	//this.phoneButton.style.display = "inline";


	/*
	while(this.skills.firstChild)
		this.skills.removeChild(this.skills.firstChild);
	while(this.cars.firstChild)
		this.cars.removeChild(this.cars.firstChild);
	*/
	
	if(this.outgoing.length == 0 || CURRENT_ACCIDENT == null) {
		//this.phoneButton.style.display = "none";
		this.unit = null;
		unitDialogDisplayed = false;
		while(this.skills.firstChild)
			this.skills.removeChild(this.skills.firstChild);
		while(this.cars.firstChild)
			this.cars.removeChild(this.cars.firstChild);
		return;
	}

	this.button.textContent = "Please wait...";
	this.button.onclick = null;

	//Destynacja - FUJ
	var self = this;
	letsWait = true;
	var request = {
		origin: new google.maps.LatLng(self.unit.x , self.unit.y),
		destination: new google.maps.LatLng(CURRENT_ACCIDENT.x, CURRENT_ACCIDENT.y),
		travelMode: google.maps.TravelMode.DRIVING
	};

	directionsService.route(request, function(response, status) {

    if (status == google.maps.DirectionsStatus.OK) {
    	//self.phoneButton.style.display = "inline";
    	self.button.textContent = "OK!";
    	self.element.style.display = "none";

    	for(var i = 0; i < self.outgoing.length; i++) {
			self.outgoing[i].state = actionState.GOING;
			self.outgoing[i].destination = response.routes[0].overview_path;
			self.outgoing[i].destination.push(new google.maps.LatLng(CURRENT_ACCIDENT.x, CURRENT_ACCIDENT.y));
			self.outgoing[i].accident = CURRENT_ACCIDENT;
		}

		self.button.onclick = function() {
			self.closeDialog();
		}

		while(this.skills.firstChild)
			this.skills.removeChild(this.skills.firstChild);
		while(this.cars.firstChild)
			this.cars.removeChild(this.cars.firstChild);

		self.outgoing = [];
		CURRENT_ACCIDENT = null;
		self.unit = null;
		unitDialogDisplayed = false;
		letsWait = false;
    }
  });
}