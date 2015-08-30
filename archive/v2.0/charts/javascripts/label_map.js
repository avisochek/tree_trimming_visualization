
var label_map = function(Category){
	var c_map = {
		"Tree Trimming":"green",
		"tree trimming":"green",
		"Tree trimmin":"green",
		"Trimming":"green",
		"trimming":"green",
		"Tree Removal":"green",
		"Tree removal":"green",
		"tree removal":"green",
		"Removal":"green",
		"removal":"green",
		"Stump":"green",
		"stump":"green",
		"Potholes":"red",
		"potholes":"red",
		"Pothole":"red",
		"pothole":"red",
		"Sinkholes":"red",
		"sinkholes":"red",
		"Sinkhole":"red",
		"sinkhole":"red",
		"SNOW RELATED":"white",
		"Snow Related":"white",
		"Snow related":"white",
		"snow related":"white",
		"Policing Issue":"black",
		"Bike Theft":"black",
		"Public Space, Streets and Drains":"blue",
		"Street Lamp":"yellow",
		"Street lamp":"yellow",
		"street lamp":"yellow",
		"Lamp":"yellow",
		"lamp":"yellow",
		"Illegal Dumping":"purple",
		"Illegal dumping":"purple",
		"illegal dumping":"purple",
		"Dumping":"purple",
		"dumping":"purple"
	}
	// /debugger;
	var categories = Object.keys(c_map)
	if(categories.indexOf(Category)+1){
		return c_map[Category];
	}else{
		return 'grey';
	};
}
