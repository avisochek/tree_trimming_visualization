
var color_map = function(Category){
	var c_map = {
	"Tree Trimming":'green',
	"Tree Removal":"green",
	"Stump":"green",
	"Potholes":"red",
	"Snow Related":"white",
	"Policing Issue":"black",
	"Bike Theft":"black",
	"Public Space, Streets and Drains":"blue",
	"Street Lamp":"yellow"
	}
	debugger;
	var categories = Object.keys(c_map)
	if(categories.indexOf(Category)+1){
		return c_map[Category];
	}else{
		return 'grey';
	};
}
