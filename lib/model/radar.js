var bus = require('../bus').bus;
var data = [];

var nextId = 0;

bus.on('radar', function(radar){
    data = radar;

    data.forEach(function(item){
       item.id>nextId && (nextId=item.id);
    })
    nextId++;
    bus.emit('model-ready')
})

bus.on('new-tech', function(item){
   item.id = nextId++;
   data.push(item);
   bus.emit('tech-added', item)
});


exports.getRadar = function(){ return data;};