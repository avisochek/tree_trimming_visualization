//draw map of new haven and plot points on map
function draw(geo_data,zoom,months,div) {
	"use strict";
	var margin=20
	var width = 520,height = 520;

	var svg = d3.select(div)
	  .append("svg")
		.attr("width", width + margin)
		.attr("height", height + margin)
		.append('g')
		.attr('class', 'map');

	//create map projection
	var projection = d3.geo.mercator()
		.center([-72.87, 41.3])
		.scale(400000*zoom*.5);

	var path = d3.geo.path().projection(projection);

	//plot map
	var map = svg.selectAll('path')
		 .data(geo_data.features)
		 .enter()
		 .append('path')
		 .attr('d', path)
		 .style('fill', 'lightBlue')
		 .style('stroke', 'black')
		 .style('stroke-width', 1);

	function plot_points(data){
		//extract useful information from the data and put in transformed_data
		var transformed_data=[];
		data.forEach(function(d){
			if(d.request_type_title === "Tree Trimming"){
				transformed_data.push({
					"lng":projection([d.lng,d.lat])[0],
					"lat":projection([d.lng,d.lat])[1],
					"month":parseInt(d.created_at.substr(5,2))
				});
			}
		});

		svg.append('g')
			.attr("class", "bubble")

		var circles=svg
			.selectAll("circle")
			.data(transformed_data)

    //plot issues using longitude and latitude as circles on map
		circles.enter()
			.append("circle")
			.attr("cx",function(d) {return d.lng;})
			.attr("cy",function(d) {return d.lat;})
			.attr('opacity', function(d){
				if (months.indexOf(d.month)>=0){
					return 0.3;
				}else{return 0.;};
			})
			.attr('r',2)
			.style("fill","green");
	}
	d3.csv("data/nhv6.2.csv", function(d) {
		return d;
  	}, plot_points);
};
