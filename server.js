var express = require('express');
var server = express.createServer();

server.use(express.static(__dirname));
server.use(require('browserify')({
    entry : __dirname + '/main.js',
    watch : true
}));

server.listen(9393);
console.log('Listening on 9393...');
