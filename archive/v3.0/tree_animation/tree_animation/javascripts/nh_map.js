function draw(geo_data,zoom) {
	"use strict";
	var margin = 0,
		width = 1400 - margin,
		height = 1000 - margin;

	var svg = d3.select("#map")
		.append("svg")
		.attr("width", width + margin)
		.attr("height", height + margin)
		.append('g')
		.attr('class', 'map');

	var projection = d3.geo.mercator()
		.center([-72.94, 41.325])
		.scale(400000*zoom*.5);

	var path = d3.geo.path().projection(projection);

	var map = svg.selectAll('path')
		 .data(geo_data.features)
		 .enter()
		 .append('path')
		 .attr('d', path)
		 .style('fill', 'lightBlue')
		 .style('stroke', 'black')
		 .style('stroke-width', 1);

	//debugger;

	function plot_points(data){

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

		circles.enter()
			.append("circle")
			.attr("cx",function(d) {return d.lng;})
			.attr("cy",function(d) {return d.lat;})
			.attr('opacity',0)
			.attr('r',5)
			.style("fill","green");
			//YOUR CODE HERE

		function update(month){
			var months=['January ','February ','March ','April ','May ','June ','July ','August','September ','November ','October ','December ']
			var header = months[month]
			d3.select('#header').text(header)

			svg.selectAll('circle')
			.attr('opacity', function(d){
				if (d.month===month+1){

					return 0.5;
				}else{return 0.;};
			});
		}

		var qqq=0;

		var animation1 = setInterval(function() {
					update(qqq);
					qqq+=1;
					if(qqq >= 12) {
							clearInterval(animation1);
					}
		}, 1000);

		d3.selectAll(".button").on("click",function(){update(parseInt(d3.select(this).attr("month")))})
		/// get the categories to respond when clicking by staying permanent bold,
		/// and marking a placeholder....

		//update the thing whenever there is a change in the slider
		//d3.select("#slider").on("change",update(d3.select(this).value));
	}
	d3.csv("../../data/nhv6.2.csv", function(d) {
		return d;
  	}, plot_points);
};
