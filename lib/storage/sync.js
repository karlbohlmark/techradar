var bus = require('../bus').bus;

var socket = io.connect('http://localhost:9393');
socket.on('new-tech', function (t) {
    bus.emit('new-tech', t);
});

socket.on('tech-moved', function (t) {
    bus.emit('tech-moved', t);
});

socket.on('radar', function (r) {
    bus.emit('radar', r);
});

bus.on('tech-added', function(t){
    !t.remote && socket.emit('tech-added', t);
});

bus.on('tech-moved', function(t){
    !t.remote && socket.emit('tech-moved', t);
});