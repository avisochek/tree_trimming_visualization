
var svg1 = dimple.newSvg("#chart", 1000, 400);
d3.csv("data/Tree Trimming_by_month.csv", function (data) {
  //create_line chart of issues
  var myChart = new dimple.chart(svg1, data);
  myChart.setBounds(60, 30, 900, 305)
  var x = myChart.addCategoryAxis("x", "Month");
  //order by date
  x.addOrderRule(
["Jan '11","Feb '11","Mar '11","Apr '11","May '11","Jun '11","Jul '11","Aug '11",
"Sep '11","Oct '11","Nov '11","Dec '11","Jan '12","Feb '12","Mar '12","Apr '12",
"May '12","Jun '12","Jul '12","Aug '12","Sep '12","Oct '12","Nov '12","Dec '12",
"Jan '13","Feb '13","Mar '13","Apr '13","May '13","Jun '13","Jul '13","Aug '13","Sep '13",
"Oct '13","Nov '13","Dec '13","Jan '14","Feb '14","Mar '14","Apr '14","May '14",
"Jun '14","Jul '14","Aug '14","Sep '14","Oct '14","Nov '14","Dec '14"]);

  myChart.addMeasureAxis("y", "Issues Reported");
  myChart.addSeries(null, dimple.plot.line);
  myChart.addLegend(60, 10, 750, 20, "right");
  myChart.draw();

  //place an opaque rectangle over the second half of each year in the chart
  var rectpos=[1,3,5,7];
  var chart_width = $(".dimple-gridline")[0].getBoundingClientRect().width
  rectpos.forEach(function(i){
  d3.select(".dimple-gridline")
    .append("rect")
    .attr("height","100%")
    .attr("width",function(){
      return chart_width/8
      })
     .attr("x",function(){
        return chart_width*i/8
      })
      .style("opacity",.3)
      .style("fill","black");
     });
});
