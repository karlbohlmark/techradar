var express = require('express');
var app = express.createServer(),
    io = require('socket.io').listen(app);
var http = require('http');
var request = require('request');
var fs = require('fs');
var path = require('path');
var dbname = 'radar.db';

var db;
var exists = path.existsSync(dbname);
if(exists){
  db = fs.readFileSync(dbname);
  console.log('file exists')
  if(db.length>0)
    db = JSON.parse(db);
  else
    db = { radar:[]}
}else{
  db = {radar:[]}
}

setInterval(function(){
  console.log('writing db file')
  fs.writeFileSync(dbname, JSON.stringify(db));
  console.log('wrote db file')
},5000)

http.createServer(function(req, res){
  console.log(req.url);
  if (req.method === 'GET' && /^\/couch/.test(req.url)) {
    var r = request.get('http://localhost:5984' + req.url.replace('/couch', '')) 
    req.pipe(r);
    r.pipe(res);
  }else{
    r = request.get('http://localhost:9393' + req.url);
    req.pipe(r);
    r.pipe(res);
  }  
}).listen(8001);


app.use(express.static(__dirname));
app.use(express.bodyParser());
app.use(require('browserify')({
    entry : __dirname + '/main.js',
    watch : true
}));

io.sockets.on('connection', function (socket) {
  socket.emit('radar', db.radar);
  socket.on('radar', function (data) {
    console.log(data);
  });

  socket.on('tech-added',function(t){
    console.log('tech added');
    db.radar.push(t)
    t.remote = true;
    socket.broadcast.emit('new-tech', t);
  });


  socket.on('tech-moved',function(t){
    console.log('tech moved');
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
console.log('Listening on 8001...');
