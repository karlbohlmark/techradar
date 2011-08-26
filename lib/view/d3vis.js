var w = 1000,
    h = 1000,
    p = 20;


exports.vis = d3.select("body")
  .append("svg:svg")
    .attr("width", w + p * 2)
    .attr("height", h + p * 2)
  .append("svg:g")
  