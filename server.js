var express = require('express');
var app = express.createServer(),
    io = require('socket.io').listen(app);
var fs = require('fs');
var path = require('path');
var dbName = 'radar.db';

var db = path.existsSync(dbName)
  && (db = fs.readFileSync(dbName))
  && JSON.parse(db)
|| { radar:[] };

setInterval(function(){
  fs.writeFileSync(dbName, JSON.stringify(db));
  console.log('wrote db file')
},5000)

app.use(express.static(__dirname));
app.use(require('browserify')({
    entry : __dirname + '/main.js',
    watch : true
}));

io.sockets.on('connection', function (socket) {
  socket.emit('radar', db.radar);

  socket.on('tech-added',function(t){
    console.log('tech added');
    db.radar.push(t)
    t.remote = true;
    socket.broadcast.emit('new-tech', t);
  });

  socket.on('tech-deleted',function(t){
    db.radar = db.radar.filter( function(tech) { return tech.id!=t.id; } );
    t.remote = true;
    socket.broadcast.emit('delete-tech', t);
  });
    
  socket.on('tech-moved',function(t){
    db.radar.forEach(function(tech){
      if(tech.id == t.id){
        tech.x = t.x;
        tech.y = t.y;
      }
    })
    t.remote = true;
    socket.broadcast.emit('tech-moved', t);
  });
});

app.listen(9393);
console.log('Listening on 9393...');