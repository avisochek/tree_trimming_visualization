
var color_map = function(summary){
	var c_map = {
	"Tree Trimming":'red'
	}
	var categories = Object.keys(c_map)
	if(categories.indexOf(summary)+1){
		return c_map[summary];
	}else{
		return 'grey';
	};
}
