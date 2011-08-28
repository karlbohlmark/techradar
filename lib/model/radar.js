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

bus.on('tech-moved', function(t){
  var tech = data.filter(function(tech){return tech.id == t.id;})[0];
  tech.x = t.x;
  tech.y = t.y;
});

bus.on('delete-tech', function(id){
   data = data.filter(function(d){
       return d.id != id;
   });

   bus.emit('tech-deleted', {id:id});
});

exports.getRadar = function(){ return data;};