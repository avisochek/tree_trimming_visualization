function draw(geo_data,zoom) {
	"use strict";
	var margin = 0,
		width = 1400 - margin,
		height = 1400 - margin;

	var svg = d3.select("#map")
		.append("svg")
		.attr("width", width + margin)
		.attr("height", height + margin)
		.append('g')
		.attr('class', 'map');

	var projection = d3.geo.mercator()
		.center([-72.92, 41.305])
		.scale(200000*zoom*.5);

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
				var time_till_closed=null;
			if (date_closed & date_acknowledged ) {
				time_till_closed = Math.round((date_closed.valueOf() - date_created.valueOf())/86400);
			}
			transformed_data.push(
				{'year':d.created_at.substring(0,4),
				'month':d.created_at.substring(5,7),
				'hour':d.created_at.substring(11,13),
				'rating':d.rating,
				'x':projection([d.lng,d.lat])[0],
				'y':projection([d.lng,d.lat])[1],
				'status':d.status,
				'summary':d.summary,
				'category':d.request_type_title,
        'label':label_map(d.summary),
				'date_created':date_created,
				'date_acknowledged':date_acknowledged,
				'date_closed':date_closed,
				'time_till_closed':time_till_closed
				});

		})
		debugger;
		svg.append('g')
			.attr("class", "bubble")

		var circles=svg
			.selectAll("circle")
			.data(transformed_data)

		var ttc_vals = [];
		transformed_data.forEach(function(d){
			if(d.time_till_closed){
				ttc_vals.push(d.time_till_closed);
			};
		});

		var color_scale = d3.scale.quantile()
		  .domain(ttc_vals).range(['green','yellow','brown','red']);

		function get_color(d){
			if (d.date_acknowledged & d.date_closed){
				return color_scale(d.time_till_closed);
			}
			else{return "grey";}
		};

		function get_height(d,base){
			if (d.date_acknowledged & d.date_closed){return base- (2*d.rating);}
			else{return base;}
		};

		circles.enter()
			.append("circle")
			.attr("cx",function(d) {return d.x;})
			.attr("cy",function(d) {return d.y;})
			.attr("r",function(d) {return Math.sqrt(d.rating)} )
			.style('opacity',0)
			.style('fill',get_color);
			//.style("fill",function(d){return color_map(d.summary);});

		var right = d3.select('#rightbar')
			.append('svg')
			.attr('height',1400)
			.attr('width',1400)
			.append('g')
			.attr('class','map')

		var rects=svg
			.selectAll("rect")
			.data(transformed_data)

		var get_x_2013 = d3.time.scale().domain([new Date('2013-01-01'),new Date('2014-01-01')]).range([0, 1400])
		var get_x_2014 = d3.time.scale().domain([new Date('2014-01-01'),new Date('2015-01-01')]).range([0, 1400])
		var get_x_2015 = d3.time.scale().domain([new Date('2015-01-01'),new Date('2015-07-01')]).range([0, 1400])



/*		rects.enter()
			.append("rect")
			.attr("x",function(d) {return get_x_2013(d.date_created)})
			.attr("y",function(d){return get_height(d,700);})
			.attr("width",4)
			.attr("height",function(d) {return 2*d.rating} )
			.style('opacity',0)
			.style('fill',get_color);

		rects.enter()
			.append("rect")
			.attr("x",function(d) {return get_x_2014(d.date_created)})
			.attr("y",function(d){return get_height(d,800);})
			.attr("width",4)
			.attr("height",function(d) {return 2*d.rating} )
			.style('opacity',0)
			.style('fill',get_color);

		rects.enter()
			.append("rect")
			.attr("x",function(d) {return get_x_2015(d.date_created)})
			.attr("y",function(d) {return get_height(d,900);})
			.attr("width",4)
			.attr("height",function(d) {return 2*d.rating} )
			.style('opacity',0)
			.style('fill',get_color);*/

		function update(category){
			function update_opacity(d){
				var condition = 0;
				if (d.date_acknowledged & d.date_closed){
					if (!(category=="null")){condition = d.category == category;}
					else {condition = 1;}
				}
				if (condition){return 0.9;}else{return 0.;};
			};

			svg.selectAll('circle')
				.style('opacity', update_opacity);

			svg.selectAll('rect')
			  .style('opacity', update_opacity);

			if(!(category=="null")) {
				d3.select("#header").text(category);
			}else{
				d3.select("#header").text("All Categories");
			}
		}

		var categories=["Parks & Trees","Garbage Related",
		"Road Damage & Obstructions","Pedestrian Issues",
		"Policing Issue","Private Property Issue",
		"Snow Related","Street Lamps and Lighting",
		"Other","Eyesores","Traffic & Road Safety","null"];

		var i=0
		var category = "null"
	/*	var animation1 = setInterval(function() {

      category=categories[i];
			i++

		  update(category);
      if(i >= categories.length) {clearInterval(animation1);}
    }, 1000);*/

		d3.selectAll('.button').on('click',function(){
			update(d3.select(this).attr('value'));
		});
		update("null")
	}
	d3.csv("data/nhv6.2.csv", function(d) {
		return d;
  }, plot_points);
};
