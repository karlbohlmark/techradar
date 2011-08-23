
var w = 1000,
    h = 1000,
    p = 20,
    cx = w/2,
    cy = h/2,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([h, 0]),
    r = d3.scale.linear().range([0,1]),
    symbol = d3.scale.ordinal().range(d3.svg.symbolTypes),
    color = d3.scale.category10();

var vis = d3.select("body")
  .append("svg:svg")
    .attr("width", w + p * 2)
    .attr("height", h + p * 2)
  .append("svg:g")
   .attr("transform", "translate(" + p + "," + p + ")");

var colors = ['#eef7ff', '#d8edff', '#C0E0FF'];

vis.selectAll('circle.zone')
  .data([.25, .50, .75].reverse())
  .enter()
  .append('svg:circle').attr('r', function(d){return d*w/2;})
  .attr('style', function(d, i){ return "fill:" +  colors[i]})
  .attr('cx', cx)
  .attr('cy', cy)



var xrule = vis.selectAll("g.x")
    .data([0.5])
  .enter().append("svg:g")
    .attr("class", "x");

xrule.append("svg:line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", h);

var yrule = vis.selectAll("g.y")
    .data([0.5])
  .enter().append("svg:g")
    .attr("class", "y");

yrule.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w)
    .attr("y1", y)
    .attr("y2", y);

exports.vis = vis;