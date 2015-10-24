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
	this.unit = unit;
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
	this.element.textContent = "Please wait...";
	if(this.outgoing.length == 0) {
		this.phoneButton.style.display = "none";
		this.element.textContent = "OK";
		return;
	}

	//Destynacja - FUJ
	var self = this;
	var request = {
		origin: new google.maps.LatLng(self.unit.x , self.unit.y),
		destination: new google.maps.LatLng(CURRENT_ACCIDENT.x, CURRENT_ACCIDENT.y),
		//origin: {lat: self.unit.x , lng: self.unit.y},
		//dest: {lat: CURRENT_ACCIDENT.x, lng: CURRENT_ACCIDENT.y},
		travelMode: google.maps.TravelMode.DRIVING
	};
	//console.log("REQUEST");
	//console.log(request);
	directionsService.route(request, function(response, status) {
	//console.log("JUHU!!!");
	console.log(response);
	//console.log(status);
    if (status == google.maps.DirectionsStatus.OK) {
    	self.phoneButton.style.display = "inline";
    	self.element.textContent = "OK!";
    	self.element.style.display = "none";

    	for(var i = 0; i < self.outgoing.length; i++) {
			self.outgoing[i].state = actionState.GOING;
			self.outgoing[i].destination = response.routes[0].overview_path;
			self.outgoing[i].destination.push(new google.maps.LatLng(CURRENT_ACCIDENT.x, CURRENT_ACCIDENT.y));
			self.outgoing[i].accident = CURRENT_ACCIDENT;
			//Jeszcze destynacja
		}
		console.log(self.outgoing);
		//directionsDisplay.setDirections(response);

		self.outgoing = [];
		CURRENT_ACCIDENT = null;
		self.unit = null;
      //var warnings = document.getElementById("warnings_panel");
      //console.log(warnings);
      //console.log(response);
      //directionsDisplay.setDirections(response);
      //showSteps(response);
    }
  });
	/*
	for(var i = 0; i < this.outgoing.length; i++) {
		this.outgoing[i].state = accidentState.GOING;

		//Jeszcze destynacja
	}
	console.log("outgoing");
	console.log(this.outgoing);
	this.outgoing = [];
	CURRENT_ACCIDENT = null;
	this.unit = null;
	*/
	//this.element.removeChild()
}