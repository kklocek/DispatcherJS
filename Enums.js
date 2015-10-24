var accidentState = {
	WAITING_FOR_PHONE: 0,
	WAITING_FOR_ACTION: 1,
	DOING: 2,
	WAITING_FOR_REPORT: 3,
	ENDED: 4
};

var ENERGY_RATE = 3;
var TIME_TO_RECOVER_ENERGY_RATE = 3; //sekundy

var actionState = {
	AVAILABLE: 0,
	WORKING: 1,
	COULD_RETURN: 2,
	GOING: 3
};

var eventType = {
	FIRE: 0,
	CAR_ACCIDENT: 1,
	NATURAL_DISASTER: 2,
	MEDICAL_DISASTER: 3
};

var carWeights = {
	LIGHT: 3,
	MEDIUM: 2,
	HEAVY: 1
}

var PROGRESS_RATE = 3;