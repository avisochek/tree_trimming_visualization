/// zoom functionality...
var zoom=2;
d3.selectAll(".zoom").on("click",function(){
  d3.select('svg').remove();
  zoom += parseInt(d3.select(this).attr("increment"));
  if (zoom<1) {zoom = 1;};
  d3.json("../data/new_haven.geojson", function(q){draw(q,zoom);});
});
