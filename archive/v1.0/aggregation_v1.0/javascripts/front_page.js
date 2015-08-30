d3.select('#cover_text').html(" \
  <h1>Civic Issues In New Haven, CT</h1> \
  <h2>by Allan Visochek</h2> \
  <h4>Using a dataset obtained from the SeeClickFix API</h4> \
  <h4>Last updated June,6 2015</h4> \
  <p>click anywhere to continue...</p> \
");
d3.select('body').on('click',function(){
  d3.select('#cover_text').html(" \
  <h3>This is a choose your own adventure visualization.</h3> \
  <h3>Use the left panel to select the issue \
  categories,dates and chart types,</h3> \
  <h3>or select one of the animations on the top panel</h3> \
  <p>click anywhere to continue...</p>"
    );
  d3.select('body').on('click',function(){
    d3.select('#cover_page').remove()
  });
});
