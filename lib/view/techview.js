
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
    tech.style.left = t.x + 'px';
    tech.style.top = t.y + 'px';
})


var getTransform = function(target, type){
  var animVal = target.transform.animVal;
  var length = animVal.numberOfItems;
  for(var i=0;i<length;i++){
      var transform = animVal.getItem(i);
      if(transform.type ==type){
        return transform;
      }
  }
};

/*

  const unsigned short SVG_TRANSFORM_UNKNOWN = 0;
  const unsigned short SVG_TRANSFORM_MATRIX = 1;
  const unsigned short SVG_TRANSFORM_TRANSLATE = 2;
  const unsigned short SVG_TRANSFORM_SCALE = 3;
  const unsigned short SVG_TRANSFORM_ROTATE = 4;
  const unsigned short SVG_TRANSFORM_SKEWX = 5;
  const unsigned short SVG_TRANSFORM_SKEWY = 6;

* */

var getTranslateMatrix = function(target){
  var transform = getTransform(target, 2 /* SVG_TRANSFORM_SCALE */)
  return transform.matrix;
};

var removeActiveState= function(target){
  target.classList.remove('active')};

var setActiveState = function(target){
  target.classList.add('active');
};

var startDragging = function(d){
    var e = d3.event;
    var target = e.target;
    setActiveState(target);
    var targetStartPos = {x: parseInt(target.style.left), y: parseInt(target.style.top)};
    var mouseStartPos = {x: e.clientX, y: e.clientY};

    var move = function(moveEv){
        var x = moveEv.clientX- mouseStartPos.x + targetStartPos.x;
        var y = moveEv.clientY- mouseStartPos.y + targetStartPos.y
        bus.emit('tech-moved', {id: target.id, x:x, y:y});
    }
    
    var drop = function(e){
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', drop);
        removeActiveState(target);
    }
    
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', drop);
}

var drawDots = function(data){
    console.log(data)
    d3.select("body")
    .selectAll('div.tech').remove();
    d3.select("body")
    .selectAll('div.tech')
    .data(data)
    .enter()
        .append("div")
            .attr('class', 'tech')
            .attr('id', function(d){return d.id})
            .attr("style", function(d) { return "overflow:visible;left:" + d.x + "px;top:" + d.y + "px"; })
            .on('mousedown', startDragging)
            .append('span')
                .text(function(d){return d.title;});
/*
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
*/
}

exports.drawDots = drawDots;