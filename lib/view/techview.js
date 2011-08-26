
var vis = require('./d3vis').vis;
var bus = require('../bus').bus;
var color = d3.scale.category10();

var
  w = 1000,
  h = 1000,
  symbols = {},
  symbolTypes = d3.svg.symbolTypes
;
symbolTypes.forEach(function(t, i){symbols[t] = i});

bus.on('tech-moved', function(t){
    var tech = document.getElementById(t.id);
    var transform = 'translate(' + t.x  +','+ t.y +')';
    tech.setAttribute('transform', transform);
})

var startDragging = function(d){
    var e = d3.event;
    var target = e.target.parentNode;
    var matrix = target.transform.animVal.getItem(0).matrix;
    var targetStartPos = {x:matrix.e, y: matrix.f};
    var mouseStartPos = {x: e.clientX, y: e.clientY};

    var move = function(moveEv){
        var x = moveEv.clientX- mouseStartPos.x + targetStartPos.x;
        var y = moveEv.clientY- mouseStartPos.y + targetStartPos.y
        bus.emit('tech-moved', {id: target.id, x:x, y:y});
    }
    
    var drop = function(e){
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', drop);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', drop);
}

var drawDots = function(data){
    var techDot = vis.selectAll("g.tech")
    .data(data)
  .enter()
    .append("svg:g")
    .attr('class', 'tech')
    .attr('id', function(d){return d.id})
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .on('mousedown', startDragging);

techDot.append('svg:text')
    .text(function(d, i){return (i +1) .toString()})
    .attr('x', 8)
    .attr('y', -5)

techDot
    .append('svg:path')
    .attr("class", "dot")
    .attr("stroke", function(d, i) { return color(i); })
    .attr('style', function(d, i){return "fill:" + color(i)})
    .attr("d", d3.svg.symbol());

}

exports.drawDots = drawDots;