function draw(geo_data,zoom) {
	"use strict";
	var margin = 0,
		width = 1400 - margin,
		height = 1400 - margin;

	var svg = d3.select("body")
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

	function plot_points(data){

		var transformed_data =[]
		//debugger;
		data.forEach(function(d){
			var date_created = new Date (d.created_at);
			var date_closed = null;
			if (d.closed_at) {date_closed = new Date(d.closed_at);}
			var date_acknowledged = null;
			if (d.acknowledged_at) {date_acknowledged = new Date(d.acknowledged_at);}
			transformed_data.push(
				{'year':d.created_at.substring(0,4),
				'month':d.created_at.substring(5,7),
				'hour':d.created_at.substring(11,13),
				'rating':d.rating,
				'x':projection([d.lng,d.lat])[0],
				'y':projection([d.lng,d.lat])[1],
				'status':d.status,
				'summary':d.summary,
				'category':d.category,
        'label':label_map(d.summary),
				'date_created':date_created,
				'date_acknowledged':date_acknowledged,
				'date_closed':date_closed
				});

		})
//debugger;
		svg.append('g')
			.attr("class", "bubble")

		var circles=svg
			.selectAll("circle")
			.data(transformed_data)

		circles.enter()
			.append("circle")
			.attr("cx",function(d) {return d.x;})
			.attr("cy",function(d) {return d.y;})
			.attr("r",function(d) {return 3*Math.cbrt(d.rating)} )
			.attr('opacity',0)
			.style("fill",function(d){return color_map(d.summary);});
			//YOUR CODE HERE

		function update(date,category){

			function update_opacity(d){
				var condition = 0;
					if (d.date_acknowledged){
						condition = date > d.date_created.valueOf();
						condition &= date - d.date_created<4640000000;
						if (category){
							debugger;
							condition &= d.category == category;
						}

					}
				//time_since<864000000
				if (condition){
					return 0.9;
				}else{return 0.;};
			};
			function update_color(d){
				var condition = 0;
				if (d.date_acknowledged){
					if (d.date_closed){
						//if (date < d.date_closed.valueOf()) {condition = 1;}
						condition=1;
					}
				}
				if (condition){
					return "green";
				}else{return "orange";};
			};

			svg.selectAll('circle')
				.attr('opacity', update_opacity)
				.style('fill', update_color);
			}


		//set update functions

		  update(1438295175000);

			var date=1357962375000;

			function animate(category){
				var animation1 = setInterval(function() {
							update(date,category);
							console.log(date)
	            date+=4640000000;

	            if(date >= 1438295175000) {
	                clearInterval(animation1);
	            }
	          }, 1000);
				}
				animate("Garbage Related");
		}
	d3.csv("../data/nhv6.2.csv", function(d) {
		return d;
  	}, plot_points);
};
