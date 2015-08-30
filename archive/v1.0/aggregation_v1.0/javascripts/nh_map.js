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

	//debugger;

	function plot_points(data){

		//debugger;
		/*var nested = d3.nest()
			.key(function(d){return d.created_at.substring(0,4)})
			.rollup(function(leaves) {
				var coords = [];

				leaves.forEach(function(d){
					var qqqq = projection( [+d.lng, +d.lat] );
					coords.push(  qqqq  );
				});

				return {"coords":coords};
			})
			.entries(data);
		//debugger;*/

		var transformed_data =[]
		//debugger;
		data.forEach(function(d){
			transformed_data.push(
				{"values":
					{'year':d.created_at.substring(0,4),
					'month':d.created_at.substring(5,7),
					'hour':d.created_at.substring(11,13),
					'rating':d.rating,
					'x':projection([d.lng,d.lat])[0],
					'y':projection([d.lng,d.lat])[1],
					'status':d.status,
					'summary':d.summary,
          'label':label_map(d.summary)}
				});

		})
		svg.append('g')
			.attr("class", "bubble")


		var circles=svg
			.selectAll("circle")
			.data(transformed_data)

		circles.enter()
			.append("circle")
			.attr("cx",function(d) {return d.values.x;})
			.attr("cy",function(d) {return d.values.y;})
			.attr("r",function(d) {return 3*Math.cbrt(d.values.rating)} )
			.attr('opacity',0)
			.style("fill",function(d){return color_map(d.values.summary);});
			//YOUR CODE HERE


		function update(){

			//get month, year and hour
			var use_year = parseInt(d3.select("#year_toggle").attr("active"));
			var year= null;
			if (use_year) {year = d3.select('#year_selector').property("value");};

			var use_month = parseInt(d3.select("#month_toggle").attr("active"));
			var month=null;
			if (use_month) {
				month = d3.select('#month_selector').property("value");
				if(month.length===1){month = "0"+month;};
			};

			var use_hour = parseInt(d3.select("#hour_toggle").attr("active"));
			var hour=null;
			if (use_hour) {
				hour = d3.select('#hour_selector').property("value");
				if(hour.length===1){hour = "0"+hour;};
			};

			var active_labels = [];
			var cats = document.getElementsByClassName("category");
			for (var i=0;i<cats.length;i++){
				active_labels.push(parseInt(cats[i].getAttribute("active")));
			}

			//debugger;
			var labels = ["green","red","yellow","black","blue","white"]
			var months=['January ','February ','March ','April ','May ','June ','July ','August','September ','November ','October ','December ']
			var header = ''
			if(use_hour){header+=hour+':00 ';}
			if(use_month){header+=months[parseInt(month)-1];}
			if(use_year){header+=year;}
			d3.select('#header')
				.text(header)

			function updated(d){
				var condition = 1;
				var right_category = 0;
				if(use_year | use_month | use_hour){
					if(use_year){condition &= (d['values']['year']===year);};
					if(use_month){condition &= (d['values']['month']===month);};
					if(use_hour){condition &= (d['values']['hour']===hour);};
				};
				//debugger;
				for (var i=0;i<cats.length;i++){
					if(active_labels[i]){
						right_category = right_category | ( d['values']['label']===labels[i] );
					};
				};

				if (active_labels.reduce(function(a,b) {return a+b})>0){condition &= right_category;};
				debugger;
				if (condition){
					return 0.8;
				}else{return 0.;};
			};

			svg.selectAll('circle')
				.attr('opacity', updated);

		}


		//set update functions
		update();


		// get toggle thing to work...
		d3.selectAll('.toggle').on("click",function(){
		  if(parseInt(d3.select(this).attr("active"))){
		    d3.select(d3.select(this).attr("for")).style("display","none");
		    d3.select(this).attr("active","0");
		    //d3.select("#year_selector"); // trigger the event handler in order to call the update funtion
		  }else{
		    d3.select(d3.select(this).attr("for")).style("display","flex"),
		    d3.select(this).attr("active","1");
		    //d3.select("#year_selector");  // trigger the event handler in order to call the update funtion
		  };
			update();
		});

		/// get the categories to respond when clicking by staying permanent bold,
		/// and marking a placeholder....
		d3.selectAll(".category").on("click",function(){
		  //debugger;
		  if (parseInt(d3.select(this).attr("active"))) {
		    d3.select('#'+d3.select(this).attr("name")).property("value",0);
		    d3.select(this).attr("active","0")
				update();
		  }
		  else{
		    d3.select('#'+d3.select(this).attr("name")).property("value",1);
		    d3.select(this).attr("active","1")
		    d3.select(this).style("opacity","1");
				update();
		  }
		})
		.on("mouseover",function(){
		  d3.select(this).style("opacity","1");
		})
		.on("mouseout",function(){
		  if (!parseInt(d3.select(this).attr("active"))){
		    d3.select(this).style("opacity","0.5");
		  };
		});

		//update the thing whenever there is a change in the slider
		d3.selectAll(".slider").on("change",update);
	}
	d3.csv("../../data/nhv2.3.csv", function(d) {
		return d;
  	}, plot_points);
};
